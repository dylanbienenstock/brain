import { Injectable, EventEmitter } from '@angular/core';

export interface NavbarExtensionClickEvent {
    index: number;
    extensions: string[];
    owner: string;
}

@Injectable({
    providedIn: 'root'
})
export class NavbarService {

    constructor() { }

    public extensionClicked = new EventEmitter<NavbarExtensionClickEvent>();
    public extensions: string[] = [];
    public owner: string;

    setExtensions(owner: string, exts: string[] | null) {
        this.owner = owner;

        if (!exts) return;

        let extensions = [];

        for (let ext of exts) {
            if (!ext) break;
            extensions.push(ext);
        }

        this.extensions = extensions;
    }

    triggerClickEvent(index: number) {
        this.extensionClicked.emit({
            index,
            extensions: this.extensions,
            owner: this.owner
        });
    }
}
