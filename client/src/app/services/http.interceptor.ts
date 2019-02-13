import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { ConnectionService } from 'ng-connection-service';

import { Globals } from '../app.globals';
import { ResponseCacheService } from './response-cache.service';
import { RequestCacheService } from './request-cache.service';
import { getCacheRules, CacheReq, CacheRes } from './http.cache-rules';


@Injectable()
export class MainInterceptor implements HttpInterceptor, OnDestroy {

    constructor(private globals: Globals,
                private connectionService: ConnectionService,
                private responseCacheService: ResponseCacheService,
                private requestCacheService: RequestCacheService) {
                    this.connectionStatusSub = 
                        this.connectionService.monitor()
                            .subscribe((connected) => {
                                this.onConnectionStatusChanged(connected);
                            });
                }

    private connectionStatusSub: Subscription;
    private connected: boolean = true;

    ngOnDestroy() {
        this.connectionStatusSub.unsubscribe();
    }

    intercept(_req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = {
            "B-PASSCODE": this.globals.passcode,
            "B-KEY-NAME": this.globals.keyName,
            "B-KEY": this.globals.key
        };

        let req = _req.clone({ setHeaders: headers });

        if (!this.connected) {
            if (this.shouldCacheRequest(req)) {
                this.requestCacheService.put(req);
            }

            if (this.shouldCacheResponse(req)) {
                let cachedRes = this.responseCacheService.get(req);
                if (cachedRes) return new Observable((s) => s.next(cachedRes));
            }
        }

        return this.sendRequest(req, next);
    }

    sendRequest(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            tap((res) => {
                if (res instanceof HttpResponse) {
                    if (this.shouldCacheResponse(req)) {
                        this.responseCacheService.put(req, res);
                    }
                }
            })
        );
    }
    
    shouldCacheRequest(req: HttpRequest<any>) {
        let rules = getCacheRules(req.url);

        return rules.req != CacheReq.NEVER;
    }

    shouldCacheResponse(req: HttpRequest<any>) {
        let rules = getCacheRules(req.url);

        return rules.res != CacheRes.NEVER;
    }

    onConnectionStatusChanged(connected: boolean) {
        this.connected = connected;

        console.log("Connection status changed: " + connected);
    }
}