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

    // Authentication
    submitPasscode(code: string): 
        Observable<Responses.SubmitPasscode> {
            return this.httpClient
                .post(Routes.submitPasscode, <Requests.SubmitPasscode> { code })
                .pipe(take(1)) as Observable<Responses.SubmitPasscode>;
        }


    // Task Lists
    createTaskList(req: Requests.CreateTaskList):
        Observable<Responses.CreateTaskList> {
            return this.httpClient
                .post(Routes.createTaskList, req)
                .pipe(take(1)) as Observable<Responses.CreateTaskList>;
        }

    getTaskLists():
        Observable<Responses.GetTaskLists> {
            return this.httpClient
                .post(Routes.getTaskLists, <Requests.GetTaskLists> {})
                .pipe(take(1)) as Observable<Responses.GetTaskLists>;
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

    
    // Tasks
    createTask(req: Requests.CreateTask):
        Observable<Responses.CreateTask> {
            return this.httpClient
                .post(Routes.createTask, req)
                .pipe(take(1)) as Observable<Responses.CreateTask>;
        }

    getTasks(req: Requests.GetTasks):
        Observable<Responses.GetTasks> {
            return this.httpClient
                .post(Routes.getTasks, req)
                .pipe(take(1)) as Observable<Responses.GetTasks>;
        }


    updateTask(req: Requests.UpdateTask):
        Observable<Responses.UpdateTask> {
            return this.httpClient
                .post(Routes.updateTask, req)
                .pipe(take(1)) as Observable<Responses.UpdateTask>;
        }

    deleteTask(req: Requests.DeleteTask):
        Observable<Responses.DeleteTask> {
            return this.httpClient
                .post(Routes.deleteTask, req)
                .pipe(take(1)) as Observable<Responses.DeleteTask>
        }
}
