import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyUtil } from './key-util';

interface Flag {
    flag: string;
    desc: string;
}

interface Argument {
    arg: string;
    desc: string;
}

interface Command {
    cmd: string;
    desc: string;
    fn: (flags?: string[], ...args) => void;
    args?: Argument[];
    optionalArgs?: Argument[];
    flags?: Flag[];
}

@Component({
    selector: 'app-key-manager',
    templateUrl: './key-manager.component.html',
    styleUrls: ['./key-manager.component.scss']
})
export class KeyManagerComponent implements AfterViewInit, OnDestroy {

    constructor() { }

    public output: string[] = [];
    public input: string = "";

    private keyUtilOutput: Subscription;
    private commands: Command[] = [
        {
            cmd: "help",
            desc: "Lists all commands.",
            fn: this.cmdHelp.bind(this),
            optionalArgs: [
                {
                    arg: "cmd",
                    desc: "The command to get help for."
                }
            ]
        },
        {
            cmd: "clear",
            desc: "Clears the output buffer.",
            fn: this.cmdClear.bind(this)
        },
        {
            cmd: "list-keys",
            desc: "Lists all stored keys.",
            fn: this.cmdListKeys.bind(this)
        },
        {
            cmd: "gen-key",
            desc: "Generates a new key.",
            fn: this.cmdGenKey.bind(this),
            args: [
                {
                    arg: "name",
                    desc: "The name of the generated key."
                }
            ],
            flags: [
                {
                    flag: "use",
                    desc: "Sets the new key as the default key."
                },
                {
                    flag: "upload",
                    desc: "Uploads the key to the server."
                }
            ]
        },
        {
            cmd: "use-key",
            desc: "Sets the default key.",
            fn: this.cmdHelp.bind(this),
            args: [
                {
                    arg: "name",
                    desc: "The name of the key to set as the default key."
                }
            ],
            flags: [
                {
                    flag: "upload",
                    desc: "Uploads the key to the server."
                }
            ]
        }
    ]

    ngAfterViewInit() {
        this.keyUtilOutput =
            KeyUtil.output.subscribe((str) => {
                this.log(str);
            });

        setTimeout(() => {
            this.log(`Key manager initialized.`);
            this.log();
            this.cmdHelp();
        });
    }

    ngOnDestroy() {
        this.keyUtilOutput.unsubscribe();
    }

    log(str?: string) {
        this.output.push(str || "");
    }

    processCommand(str: string): { cmd: string, args: string[], flags: string[] } {
        let args = str.trim().split(" ");
        let cmd = args.shift();
        let flags = [];

        for (let i = args.length - 1; i >= 0; i--) {
            if (args[i].startsWith("--")) {
                flags.push(args[i].substr(2));
                args.splice(i, 1);
            }
        }

        return { cmd, args, flags };
    }

    onCommandExecuted() {
        let { cmd, args, flags } = this.processCommand(this.input);

        this.log();
        this.log("$ " + this.input.trim());
        this.log();
        this.input = "";

        let command = this.commands.find(c => c.cmd == cmd);
        
        let notFound = ' Type "help" to list all commands.';
        let badSyntax = ` Type "help ${cmd}" for help.`;

        if (!command) {
            this.log("Command not found." + notFound);
            return;
        }

        if (command.args && args.length != command.args.length) {
            this.log("Incorrect argument count." + badSyntax);
            return;
        }

        for (let flag of flags) {
            let cmdFlag = command.flags.find(f => f.flag == flag);

            if (!cmdFlag) {
                this.log("Invalid flag." + badSyntax);
            }
        }

        command.fn(flags, ...args);
    }

    cmdHelp(flags?: string[], cmd?: string) {
        if (cmd) {
            let command = this.commands.find(c => c.cmd == cmd);

            if (!command) {
                this.log('Command not found. Type "help" to list all commands.');
                return;
            }
            
            this.log(`${ command.cmd } - ${ command.desc }`);

            if (command.args) {
                for (let arg of command.args) {
                    this.log(`<${ arg.arg }> | ${ arg.desc }`)
                }
            }

            if (command.optionalArgs) {
                for (let arg of command.optionalArgs) {
                    this.log(`<${ arg.arg }> | (Optional) ${ arg.desc }`)
                }
            }

            if (command.flags) {
                for (let flag of command.flags) {
                    this.log(`--${ flag.flag } | ${ flag.desc }`)
                }
            }
        } else {
            this.log(`Available commands:`);
    
            for (let command of this.commands) {
                let args = "";
    
                if (command.args) {
                    for (let arg of command.args) {
                        args += ` <${ arg.arg }>`;
                    }
                }
    
                if (command.optionalArgs) {
                    args += " [";
    
                    for (let arg of command.optionalArgs) {
                        args += ` <${ arg.arg }>`;
                    }
    
                    args += " ]";
                }

                if (command.flags) {
                    args += " [";
    
                    for (let flag of command.flags) {
                        args += ` --${ flag.flag }`;
                    }
    
                    args += " ]";
                }
        
                this.log(`${ command.cmd }${ args } | ${ command.desc }`);
            }
        }
    }

    cmdClear() {
        this.output = ["$ clear"];
    }

    cmdListKeys() {
        let allKeys = KeyUtil.getAllKeys();
        let defaultKey = KeyUtil.getDefaultKeyName();

        if (allKeys.length == 0) {
            this.log('There are no keys stored. Type "gen-key <name>" to generate one.');
            return;
        }

        this.log("Available keys:");

        let now = new Date();

        for (let key of allKeys) {
            let dateDiff = Math.floor((now.getTime() - key.date.getTime()) / (1000 * 60 * 60 * 24));
            this.log(`${ key.name == defaultKey ? '* ' : '' }${ key.name } | ${ dateDiff } days ago`);
        }
    }

    cmdGenKey(flags: string[], name: string) {
        KeyUtil.genKey(name);
    }
}
