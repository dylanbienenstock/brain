import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from './app.globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private globals: Globals, private router: Router) {
        router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                if (globals.passcode == "") {
                    this.showAuthenticator = true;
                }
            }
        });
    }

    public showAuthenticator: boolean = false;

    onHideAuthenticator() {
        this.showAuthenticator = false;
    }
}
