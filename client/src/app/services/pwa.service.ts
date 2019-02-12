import { Injectable, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PwaService implements OnDestroy {

    constructor(private swUpdate: SwUpdate) { }

    public updateSub: Subscription;

    ngOnDestroy() {
        this.updateSub.unsubscribe();
    }

    subscribeToUpdates() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if (confirm("New version available. Install?")) {
                    location.reload();
                }
            });
        }
    }
}
