import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

interface ResponseValue {
    res: HttpResponse<any>;
    date: number;
}

interface ResponseCacheAdapter {
    maxAge: number;

    getKeys(): string[];
    putKey(key: string): void;
    delKey(key: string): void;

    getVal(key: string): ResponseValue;
    putVal(key: string, val: ResponseValue): void;
    delVal(key: string): void;
}

function prefixKey(key: string) {
    return `res-cache-${ key }`;
}

function createRequestKey(req: HttpRequest<any>): string {
    let key = `${ req.urlWithParams }-${ JSON.stringify(req.body) }`;

    return prefixKey(key);
}

function createResponseValue(res: HttpResponse<any>): ResponseValue {
    let date = Date.now();

    return { date, res };
}

@Injectable({
    providedIn: 'root'
})
export class ResponseCacheService {

    constructor() { }

    private adapters: ResponseCacheAdapter[] = [
        new ResponseMemCacheAdapter(),
        new ResponseLocalStorageAdapter()
    ];


    // Response <-> Cache
    private _get(key: string): ResponseValue {
        for (let adapter of this.adapters) {
            let val = adapter.getVal(key);

            if (!val) continue;

            let age = Date.now() - val.date;

            if (age > adapter.maxAge) {
                adapter.delKey(key);
                adapter.delVal(key);

                continue;
            }

            return val;
        }

        return null;
    }

    private _put(key: string, val: ResponseValue) {
        for (let adapter of this.adapters) {
            adapter.putKey(key);
            adapter.putVal(key, val);
        }
    }


    // Response <-> Interceptor
    public put(req: HttpRequest<any>, res: HttpResponse<any>) {
        let key = createRequestKey(req);
        let val = createResponseValue(res);

        console.log("[RES-CACHE] PUT:", key, "=", val);

        this._put(key, val);
    }

    public get(req: HttpRequest<any>): HttpResponse<any> {
        let key = createRequestKey(req);
        let val = this._get(key);

        console.log("[RES-CACHE] GET:", key, "=", val);

        if (!val || !val.res) return null;

        return val.res;
    }
}

class ResponseMemCacheAdapter implements ResponseCacheAdapter {
    public maxAge = 1000 * 60 * 60;

    private keyList: string[] = [];
    private cache = new Map<string, ResponseValue>();


    public getKeys(): string[] {
        let keyList = this.keyList;

        if (!keyList) return [];

        return [ ...keyList ];
    }

    public putKey(key: string): void {
        let keyList = this.getKeys();
        
        if (keyList.includes(key)) return;

        keyList.push(key);

        this.keyList = keyList;
    }

    public delKey(key: string): void {
        let keyList = this.getKeys();
        let index = this.keyList.findIndex(k => k == key);

        if (index == -1) return;

        keyList.splice(index, 1);

        this.keyList = keyList;
    }

    public getVal(key: string): ResponseValue {
        return this.cache.get(key);
    }

    public putVal(key: string, val: ResponseValue): void {
        this.cache.set(key, val);
    }

    public delVal(key: string): void {
        this.cache.delete(key);
    }
}

class ResponseLocalStorageAdapter implements ResponseCacheAdapter {
    public maxAge = 1000 * 60 * 60 * 24;

    private keyListKey = prefixKey("-key-list");


    public getKeys(): string[] {
        let keyListRaw = localStorage.getItem(this.keyListKey);

        if (!keyListRaw) return [];

        let keyList = JSON.parse(keyListRaw);

        return [ ...keyList ];
    }

    public putKey(key: string): void {
        let keyList = this.getKeys();
        
        if (keyList.includes(key)) return;

        keyList.push(key);
        
        let keyListRaw = JSON.stringify(keyList);

        localStorage.setItem(this.keyListKey, keyListRaw);
    }

    public delKey(key: string): void {
        let keyList = this.getKeys();
        let index = keyList.findIndex(k => k == key);

        if (index == -1) return;

        keyList.splice(index, 1);

        let keyListRaw = JSON.stringify(keyList);

        localStorage.setItem(this.keyListKey, keyListRaw);
    }

    public getVal(key: string): ResponseValue {
        let val: ResponseValue;

        try {
            let valRaw = localStorage.getItem(key);
            
            val = JSON.parse(valRaw);
            val.res = new HttpResponse<any>(val.res);
        } catch {
            val = null;
        }

        return val;
    }

    public putVal(key: string, val: ResponseValue): void {
        let valStr = JSON.stringify(val);
        localStorage.setItem(key, valStr);
    }

    public delVal(key: string): void {
        localStorage.removeItem(key);
    }
}
