import { Component } from '@angular/core';

@Component({
    selector: 'app-authenticator',
    templateUrl: './authenticator.component.html',
    styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent {

    constructor() { }

    public keys: string[] =
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "✓"];


}
