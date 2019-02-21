import { Injectable } from '@angular/core';
import { HttpRequest, HttpParams, HttpHeaders } from '@angular/common/http';
import { getCacheRules, CacheReq } from './http.cache-rules';
import { HttpParamsOptions } from '@angular/common/http/src/params';

interface RequestValue {
    req: HttpRequest<any>;
    date: number;
}

interface RequestCacheAdapter {
    getAll(): RequestValue[];
    clear(): void;
    put(rules: CacheReq, key: string, val: RequestValue): void;
}

function prefixKey(url: string): string {
    return `req-cache-${url}`;
}

function createRequestKey(req: HttpRequest<any>): string {
    let key = `${req.url}-${JSON.stringify(req.body)}`;

    return prefixKey(key);
}

function createRequestValue(req: HttpRequest<any>): RequestValue {
    let date = Date.now();

    return { date, req };
}

@Injectable({
    providedIn: 'root'
})
export class RequestCacheService {

    constructor() { }

    private adapters: RequestCacheAdapter[] = [
        new RequestMemCacheAdapter(),
        new RequestLocalStorageAdapter()
    ];

    public getAll(): HttpRequest<any>[] {
        let allVals: RequestValue[] = [];

        function compare(a: RequestValue, b: RequestValue): boolean {
            return a.date == b.date && 
                a.req.url == b.req.url &&
                JSON.stringify(a.req.body) == JSON.stringify(b.req.body);
        }

        for (let adapter of this.adapters) {
            for (let val of adapter.getAll()) {
                let index = allVals.findIndex(v => compare(v, val));

                if (index != -1) continue;

                allVals.push(val);
            }

            adapter.clear();
        }

        return allVals.map(v => v.req);
    }

    public put(req: HttpRequest<any>) {
        let key = createRequestKey(req);
        let val = createRequestValue(req);
        let rule = getCacheRules(req.url).req;

        console.log("[REQ-CACHE] PUT:", key, "=", val);

        for (let adapter of this.adapters) {
            adapter.put(rule, key, val);
        }
    }
}

class RequestMemCacheAdapter implements RequestCacheAdapter {
    private cache = new Map<string, RequestValue[]>();
    
    public getAll(): RequestValue[] {
        let allVals: RequestValue[] = [];

        this.cache.forEach(vals => allVals.push(...vals));

        return allVals;
    }

    public clear() {
        this.cache.clear();
    }

    public put(rule: CacheReq, key: string, val: RequestValue) {
        switch (rule) {
            case CacheReq.ALWAYS:
                let vals = this.cache.get(key) || [];
                this.cache.set(key, [ ...vals, val ]);
                    break;
            case CacheReq.ONE:
                this.cache.set(key, [val]);
                    break;
        }
    }
}

class RequestLocalStorageAdapter implements RequestCacheAdapter {
    private keyListKey: string = prefixKey("-key-list");

    private getKeyList(): string[] {
        let keyListRaw = localStorage.getItem(this.keyListKey);

        if (!keyListRaw) return [];

        let keyList: string[] = JSON.parse(keyListRaw);

        return keyList;
    }

    private get(key: string): RequestValue[] {
        let valsRaw = localStorage.getItem(key);

        if (!valsRaw) return [];

        let vals: RequestValue[] = JSON.parse(valsRaw);

        return vals;
    }

    public getAll(): RequestValue[] {
        let keyList = this.getKeyList();
        let allVals: RequestValue[] = [];

        for (let key of keyList) {
            let vals = this.get(key);

            allVals.push(...vals);
        }

        allVals = allVals.map((v) => {
            let method = v.req.method as "DELETE" | "GET" | "HEAD" | "JSONP" | "OPTIONS";
            let url = v.req.url;
            let body = v.req.body;
            let init = {
                headers: new HttpHeaders({ 
                    ...v.req.headers, 
                    "B-OFFLINE-CACHED": "1"
                }),
                params: new HttpParams({
                    fromObject: v.req.params as any
                }),
                reportProgress: v.req.reportProgress,
                responseType: v.req.responseType,
                withCredentials: v.req.withCredentials
            };

            return {
                date: v.date,
                req: new HttpRequest(method, url, body, init)
            };
        });

        console.log("BIG FUCK", allVals);

        return allVals;
    }
    
    public clear(): void {
        let keyList = this.getKeyList();

        for (let key of keyList) {
            localStorage.removeItem(key);
        }

        localStorage.removeItem(this.keyListKey);

        console.log("SHIGGY", this.getKeyList());

    }

    public put(rule: CacheReq, key: string, val: RequestValue): void {
        let valsRaw: string;

        switch (rule) {
            case CacheReq.NEVER:
                return;
            case CacheReq.ALWAYS:
                let vals = this.get(key);
                valsRaw = JSON.stringify([...vals, val]);
                    break;
            case CacheReq.ONE:
                valsRaw = JSON.stringify([val]);
                    break;
        }
        
        let keyList = this.getKeyList();

        if (!keyList.includes(key)) {
            let keyListRaw = JSON.stringify([ ...keyList, key ]);
            localStorage.setItem(this.keyListKey, keyListRaw);
        }

        localStorage.setItem(key, valsRaw);
    }
}
