import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from './app.globals';
import { HttpService } from './services/http.service';
import { ScreenService } from './services/screen.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    constructor(private globals: Globals, 
        private router: Router,
        private screenService: ScreenService) {

            this.onWindowResized();

            router.events.subscribe((e) => {
                if (e instanceof NavigationEnd) {
                    if (globals.passcode == "") {
                        this.showAuthenticator = true;
                    }
                }
            });
    }

    public showAuthenticator: boolean = false;

    public key: string = "";
    public keyName: string = "";

    ngAfterViewInit() {
        setTimeout(() => {
            if (!this.loadKey()) {
                console.log("Failed to load authentication key.")
            }
        });
    }

    loadKey(): boolean {
        let keyName = localStorage.getItem("use-key");
        
        if (!keyName) return false;

        let key = localStorage.getItem(keyName);

        if (!key) return false;

        this.keyName = keyName.substr(4);
        this.key = key;

        return true;
    }

    onAuthenticated() {
        this.showAuthenticator = false;
    }

    @HostListener("window:resize")
    onWindowResized() {
        this.screenService.setScreenSize(window.innerWidth, window.innerHeight);
    }
}
