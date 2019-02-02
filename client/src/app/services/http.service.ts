import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Routes } from "../../../../shared/routes";
import { Requests } from "../../../../shared/requests";
import { Responses } from "../../../../shared/responses";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) { }

    submitPasscode(code: string): Observable<Responses.SubmitPasscode> {
        return this.httpClient
            .post(Routes.submitPasscode, <Requests.SubmitPasscode> { code })
            .pipe(take(1)) as Observable<Responses.SubmitPasscode>;
    }
}
