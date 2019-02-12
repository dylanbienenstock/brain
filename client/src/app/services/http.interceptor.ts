import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { ConnectionService } from 'ng-connection-service';

import { Globals } from '../app.globals';
import { ResponseCacheService } from './response-cache.service';


@Injectable()
export class MainInterceptor implements HttpInterceptor, OnDestroy {

    constructor(private globals: Globals,
                private connectionService: ConnectionService,
                private requestCacheService: ResponseCacheService) {
                    this.connectionStatusSub = 
                        this.connectionService.monitor()
                            .subscribe((connected) => {
                                this.onConnectionStatusChanged(connected);
                            });
                }

    private connectionStatusSub: Subscription;
    private connected: boolean = true;

    intercept(_req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = {
            "B-PASSCODE": this.globals.passcode,
            "B-KEY-NAME": this.globals.keyName,
            "B-KEY": this.globals.key
        };

        let req = _req.clone({ setHeaders: headers });

        if (!this.connected) {
            let cachedRes = this.requestCacheService.get(req);
            if (cachedRes) return new Observable((s) => s.next(cachedRes));
        }

        return this.sendRequest(req, next);
    }

    ngOnDestroy() {
        this.connectionStatusSub.unsubscribe();
    }

    onConnectionStatusChanged(connected: boolean) {
        this.connected = connected;

        console.log("Connection status changed: " + connected);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap((res) => {
                if (res instanceof HttpResponse) {
                    this.requestCacheService.put(req, res);
                }
            })
        );
    }
}