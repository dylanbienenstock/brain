import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Globals } from './app.globals';
import { TaskList } from '../../../server/src/task-list/task-list.types';
import { HttpService } from './services/http.service';
import { Responses } from '../../../shared/responses';
import { ScreenService } from './services/screen.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private globals: Globals, 
        private router: Router,
        private httpService: HttpService,
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

    onAuthenticated() {
        this.showAuthenticator = false;
    }

    @HostListener("window:resize")
    onWindowResized() {
        this.screenService.setScreenSize(window.innerWidth, window.innerHeight);
    }
}
