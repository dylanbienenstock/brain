import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Responses } from '../../../../../shared/responses';
import { Globals } from '../../app.globals';

@Component({
    selector: 'app-authenticator',
    templateUrl: './authenticator.component.html',
    styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {

    constructor(private httpService: HttpService,
                private globals: Globals) { }

    @Output() authenticated = new EventEmitter<void>();

    private clearKey: string = "C";
    private enterKey: string = "✓";

    public codeDots = new Array(4).fill(null);
    public keys: string[] = [
        "1", "2", "3", 
        "4", "5", "6", 
        "7", "8", "9", 
        this.clearKey, "0", this.enterKey
    ];

    private keyAliases: string[] = ["c", "Enter"];
    
    public curCode: string = "";
    public waiting: boolean = false;
    public hidden: boolean = false;

    public passwordCorrect: boolean = false;
    public passwordIncorrect: boolean = false;

    @HostListener("window:keypress", ["$event.key"])
    onKeyClicked(key: string) {
        if (!this.keys.includes(key) && 
            !this.keyAliases.includes(key)) return;

        if (key == this.clearKey || key == "c") {
            this.curCode = "";
        } else if (key == this.enterKey || key == "Enter") {
            if (this.curCode.length == 4) {
                this.onPasscodeEntered(this.curCode);
            }
        } else if (this.curCode.length < 4) {
            this.curCode += key;
        }
    }

    onPasscodeEntered(code: string) {
        this.waiting = true;
        this.globals.passcode = code;

        setTimeout(() => {
            this.httpService.submitPasscode(code)
                .subscribe((res: Responses.SubmitPasscode) => {
                    this.waiting = false;
                    this.curCode = "";
    
                    if (res.success) {
                        this.onCorrectPasscode();
                    } else {
                        this.onIncorrectPasscode();
                    }
                });
        }, 1250);
    }

    onCorrectPasscode() {
        this.passwordCorrect = true;
        this.passwordIncorrect = false;

        setTimeout(() => {
            this.hidden = true;

            setTimeout(() => {
                this.authenticated.emit();
            }, 500);
        }, 500);
    }

    onIncorrectPasscode() {
        this.passwordCorrect = false;
        this.passwordIncorrect = true;

        setTimeout(() => {
            this.passwordCorrect = false;
            this.passwordIncorrect = false;            
        }, 1000);
    }
}
