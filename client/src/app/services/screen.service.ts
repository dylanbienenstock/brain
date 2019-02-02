import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    constructor() { }

    public width: number = 1920;
    public height: number = 1080;
    
    public get mobile(): boolean {
        return this.width <= 768;
    }

    setScreenSize(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
}
