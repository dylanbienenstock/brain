import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PwaService {

    constructor() {
        window.addEventListener("beforeinstallprompt", (e) => {
            this.promptEvent = e;

            console.log("PWA install prompt captured:", e);
        });

        (window as any).installPWA = () => {
            this.promptEvent.prompt();
        }
    }

    private promptEvent;
}
