import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Globals } from '../app.globals';

@Injectable()
export class PasscodeInterceptor implements HttpInterceptor {
    constructor(private globals: Globals) { }

    intercept(_req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = {
            "B-PASSCODE": this.globals.passcode,
            "B-KEY-NAME": this.globals.keyName,
            "B-KEY": this.globals.key
        };

        let req = _req.clone({ setHeaders: headers });

        return next.handle(req);
    }
}