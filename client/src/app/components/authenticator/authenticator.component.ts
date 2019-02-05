import { Component, HostListener, Output, EventEmitter, Input } from '@angular/core';
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

    @Input() key: string;
    @Input() keyName: string;
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

    public litDot: number = 0;
    public dotColored: boolean[] = [];
    public animating: boolean = false;

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

    onPasscodeEntered(passcode: string) {
        this.waiting = true;
        this.animating = true;
        this.litDot = 0;
        this.dotColored = [];

        setTimeout(() => {
            this.animate();
        }, 125);

        this.globals.passcode = passcode;
        this.globals.keyName = this.keyName;
        this.globals.key = this.key;

        setTimeout(() => {
            this.httpService.authenticate(passcode)
                .subscribe((res: Responses.Authenticate) => {
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
    }

    onIncorrectPasscode() {
        this.passwordCorrect = false;
        this.passwordIncorrect = true;
    }

    onDoneAnimating() {
        if (this.passwordCorrect) {
            setTimeout(() => {
                this.hidden = true;
    
                setTimeout(() => {
                    this.authenticated.emit();
                }, 500);
            }, 600);
        } else {
            setTimeout(() => {
                this.passwordCorrect = false;
                this.passwordIncorrect = false;
                this.dotColored = [];
            }, 1000);   
        }
    }

    animate() {
        if (!this.animating) return;

        if (this.passwordCorrect || this.passwordIncorrect) {
            if (this.litDot == 0 || this.dotColored[this.litDot - 1]) {
                this.dotColored[this.litDot] = true;
    
                let allColored = true;
    
                for (let i = 0; i < 4; i++) {
                    allColored = allColored && this.dotColored[i] === true;
                }
                
                if (allColored) {
                    this.animating = false;
                    this.litDot = null;

                    this.onDoneAnimating();
    
                    return;
                }
            }
        }
        
        this.litDot = ++this.litDot % this.codeDots.length;

        setTimeout(() => {
            this.animate();
        }, 125);
    }
}
