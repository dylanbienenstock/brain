import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable, EMPTY, Subscriber } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { ConnectionService } from 'ng-connection-service';

import { Globals } from '../app.globals';
import { ResponseCacheService } from './response-cache.service';
import { RequestCacheService } from './request-cache.service';
import { getCacheRules, CacheReq, CacheRes, CacheRule } from './http.cache-rules';
import { OfflineService } from './offline.service';
import { Responses } from '../../../../shared/responses';


@Injectable()
export class MainInterceptor implements HttpInterceptor, OnDestroy {

    constructor(private globals: Globals,
        private connectionService: ConnectionService,
        private responseCacheService: ResponseCacheService,
        private requestCacheService: RequestCacheService,
        private offlineService: OfflineService) {
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
        if (_req.headers["B-OFFLINE-CACHED"] == "1")
            return next.handle(_req);

        let headers = {
            "B-PASSCODE": this.globals.passcode,
            "B-KEY-NAME": this.globals.keyName,
            "B-KEY": this.globals.key
        };

        let req = _req.clone({ setHeaders: headers });

        return this.connected ? this.sendRequest(req, next)
                              : this.offlineRequest(req, next);
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

    offlineRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let res: HttpResponse<any>;
        let rule: CacheRule = getCacheRules(req.url);

        // Function to get a mock response
        let getMockResponse = () => {
            if (res) return;

            res = this.offlineService.getMockResponse(req);

            if (!res) return;

            // Add offlineId from mock response to cached request
            for (let key in res.body) {
                if (!res.body[key] || !res.body[key]._id) continue;

                req = req.clone({ body: { ...req.body, offlineId: res.body[key]._id } });

                break;
            }
        }

        // Function to store the request to be sent when online
        let cacheRequest = () => {
            this.requestCacheService.put(req);
        }

        // Function to get a cached response if mock response unavailable
        let getCachedResponse = () => {
            if (res) return;

            res = this.responseCacheService.get(req);
        }

        // Execute functions in order according to cache rules
        switch (rule.res) {
            case CacheRes.ALWAYS:
                getMockResponse();
                getCachedResponse();
                    break;
            case CacheRes.CACHE_FIRST:
                getCachedResponse();
                getMockResponse();
                    break;
            case CacheRes.NEVER:
                getMockResponse();                
                    break;
        }

        switch (rule.req) {
            case CacheReq.ALWAYS:
            case CacheReq.ONE:
                cacheRequest();
                    break;
        }

        // Return the offline response
        if (!res) return EMPTY;

        return new Observable<HttpEvent<any>>((sub) => {
            sub.next(res);
        });
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