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

    submitPasscode(code: string): 
        Observable<Responses.SubmitPasscode> {
            return this.httpClient
                .post(Routes.submitPasscode, <Requests.SubmitPasscode> { code })
                .pipe(take(1)) as Observable<Responses.SubmitPasscode>;
        }

    getTaskLists():
        Observable<Responses.GetTaskLists> {
            return this.httpClient
                .post(Routes.getTaskLists, <Requests.GetTaskLists> {})
                .pipe(take(1)) as Observable<Responses.GetTaskLists>;
        }

    createTaskList(req: Requests.CreateTaskList):
        Observable<Responses.CreateTaskList> {
            return this.httpClient
                .post(Routes.createTaskList, req)
                .pipe(take(1)) as Observable<Responses.CreateTaskList>;
        }

    updateTaskList(req: Requests.UpdateTaskList):
        Observable<Responses.UpdateTaskList> {
            return this.httpClient
                .post(Routes.updateTaskList, req)
                .pipe(take(1)) as Observable<Responses.UpdateTaskList>;
        }

    deleteTaskList(req: Requests.DeleteTaskList):
        Observable<Responses.DeleteTaskList> {
            return this.httpClient
                .post(Routes.deleteTaskList, req)
                .pipe(take(1)) as Observable<Responses.DeleteTaskList>
        }
}
