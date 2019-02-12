import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyUtil } from './key-util';
import { HttpService } from '../../services/http.service';
import { Responses } from '../../../../../shared/responses';
import { ScreenService } from '../../services/screen.service';

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

    constructor(private httpService: HttpService,
                private screenService: ScreenService) { }

    @ViewChild("output") outputRef: ElementRef;
    public get output(): HTMLDivElement {
        return this.outputRef.nativeElement;
    }

    @ViewChild("input") inputRef: ElementRef;
    public get input(): HTMLInputElement {
        return this.inputRef.nativeElement;
    }

    public outputText: string[] = [];
    public inputText: string = "";

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
            cmd: "exit",
            desc: "Exits the key manager.",
            fn: this.cmdExit.bind(this)
        },
        {
            cmd: "clear",
            desc: "Clears the output buffer.",
            fn: this.cmdClear.bind(this)
        },
        {
            cmd: "list",
            desc: "Lists all stored keys.",
            fn: this.cmdListKeys.bind(this)
        },
        {
            cmd: "gen",
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
                    flag: "full",
                    desc: "Equivalent to --use --upload --exit."
                },
                {
                    flag: "use",
                    desc: "Sets the new key as the default key."
                },
                {
                    flag: "upload",
                    desc: "Uploads the key to the server."
                },
                {
                    flag: "exit",
                    desc: "Exits the key manager."
                },
            ]
        },
        {
            cmd: "use",
            desc: "Sets the default key.",
            fn: this.cmdUseKey.bind(this),
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
                },
                {
                    flag: "exit",
                    desc: "Exits the key manager."
                }
            ]
        },
        {
            cmd: "upload",
            desc: "Uploads a key to the server.",
            fn: this.cmdUploadKey.bind(this),
            args: [
                {
                    arg: "name",
                    desc: "The name of the key to upload to the server."
                },
            ],
            flags: [
                {
                    flag: "exit",
                    desc: "Exits the key manager."
                }
            ]
        },
        {
            cmd: "rm",
            desc: "Permanently deletes a key.",
            fn: this.cmdRmKey.bind(this),
            args: [
                {
                    arg: "name",
                    desc: "The name of the key to be permanently deleted."
                }
            ]
        },
    ]

    private awaitingSensitive: boolean = false;
    private sensitiveResolve: (str: string) => void;

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

    autoScroll() {
        setTimeout(() => {
            this.output.scrollTop = this.output.scrollHeight;
        });
    }

    log(str?: string) {
        if (this.screenService.mobile) {
            if (this.outputText[this.outputText.length - 1]) {
                this.outputText.push("");
            }
        }

        this.outputText.push(str || "");
        this.autoScroll();
    }

    sensitive() {
        return new Promise<string>((resolve) => {
            this.awaitingSensitive = true;
            this.sensitiveResolve = resolve;

            setTimeout(() => {
                this.input.focus();
            });
        });
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

    async onCommandExecuted() {
        if (this.awaitingSensitive) {
            let sensitiveText = this.inputText;
            this.inputText = "";

            this.awaitingSensitive = false;
            this.sensitiveResolve(sensitiveText);

            return;
        }

        let { cmd, args, flags } = this.processCommand(this.inputText);

        this.log();
        this.log("$ " + this.inputText.trim());
        this.log();
        this.inputText = "";

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

        await command.fn(flags, ...args);
    }

    async cmdHelp(flags?: string[], cmd?: string) {
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

    async cmdExit() {
        this.log("Exiting in 3 seconds...");

        setTimeout(() => {
            location.href = "/";
        }, 3000);
    }

    async cmdClear() {
        this.outputText = ["$ clear"];
    }

    async cmdListKeys() {
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
            let isDefault = `key-${key.name}` == defaultKey ? '* ' : '';

            this.log(`${ isDefault }${ key.name } | ${ dateDiff } days ago`);
        }
    }

    async cmdGenKey(flags: string[], keyName: string) {
        KeyUtil.genKey(keyName);

        if (flags.includes("full")) {
            flags = ["use", "upload", "exit"];
        }

        if (flags.includes("use")) {
            this.cmdUseKey(flags, keyName);
            return;
        }

        if (flags.includes("upload")) {
            this.cmdUploadKey(flags, keyName);
            return;
        }

        if (flags.includes("exit")) {
            this.cmdExit();
        }
    }

    async cmdUseKey(flags: string[], keyName: string) {
        KeyUtil.useKey(keyName);

        if (flags.includes("upload")) {
            this.cmdUploadKey(flags, keyName);
            return;
        }
        
        if (flags.includes("exit")) {
            this.cmdExit();
        }
    }

    async cmdUploadKey(flags: string[], keyName: string) {
        let key = KeyUtil.getKey(keyName);

        if (!key) {
            this.log(`Key "${name}" does not exist.`);
            return;
        }

        this.log("Please enter the key upload password.");
        let password = await this.sensitive();

        this.log("Uploading key...");

        this.httpService.uploadKey({ key, keyName, password })
            .subscribe((res: Responses.UploadKey) => {
                if (!res.success) {
                    this.log(`Key upload failed! ${ res.error }`);
                    return;
                }

                this.log("Key successfully uploaded.");

                if (flags.includes("exit")) {
                    this.cmdExit();
                }
            });
    }

    async cmdRmKey(flags: string[], keyName: string) {
        KeyUtil.removeKey(keyName);
    }
}
