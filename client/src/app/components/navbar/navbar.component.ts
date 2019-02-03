import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { ScreenService } from '../../services/screen.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(private router: Router,
                public navbarService: NavbarService,
                public screenService: ScreenService) {

        router.events.subscribe((e) => {
            this.onRouteChange(e as any);
        });
    }

    public path: string[] = [];
    public backSymbol: string = "...";
    public delimSymbol: string = ">";
    private fullscreen: boolean = false;

    onRouteChange(e: NavigationEnd) {
        if (!(e instanceof NavigationEnd)) return;

        this.path = e.url.substr(1).split("/");

        if ((this.path.length == 1 && this.path[0] == "") ||
            this.path[0] == "authenticate") {
                this.path = [];
        }
    }

    onDirClicked(index: number) {
        if (index == -1) {
            this.router.navigate([""]);
            return;
        }

        this.router.navigate(this.path.slice(0, index + 1));

        if (index == this.path.length - 1) {
            this.navbarService.triggerClickEvent(-1);
        }
    }

    onExtClicked(index: number) {
        this.navbarService.triggerClickEvent(index);
    }

    toggleFullscreen() {
        if (this.fullscreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }

        this.fullscreen = !this.fullscreen;
    }

}
