import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

import { Routes } from "../../../../shared/routes";
import { Requests } from "../../../../shared/requests";
import { Responses } from "../../../../shared/responses";
import { Observable, OperatorFunction } from 'rxjs';

const dateify = (res: any) => {
    for (let k in res) {
        if (k == "date") {
            res[k] = new Date(res[k]);
            continue;
        }

        if (typeof res[k] == "object") {
            res[k] = dateify(res[k]);
        }
    }

    return res;
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) { }

    // Authentication
    authenticate(): 
        Observable<Responses.Authenticate> {
            return this.httpClient
                .post(Routes.Authenticate, null)
                .pipe(take(1)) as Observable<Responses.Authenticate>;
        }

    uploadKey(req: Requests.UploadKey): 
        Observable<Responses.UploadKey> {
            return this.httpClient
                .post(Routes.UploadKey, req)
                .pipe(take(1)) as Observable<Responses.UploadKey>;
        }


    // Task Lists
    createTaskList(req: Requests.CreateTaskList):
        Observable<Responses.CreateTaskList> {
            return this.httpClient
                .post(Routes.CreateTaskList, req)
                .pipe(take(1)) as Observable<Responses.CreateTaskList>;
        }

    getTaskLists():
        Observable<Responses.GetTaskLists> {
            return this.httpClient
                .post(Routes.GetTaskLists, <Requests.GetTaskLists> {})
                .pipe(take(1)) as Observable<Responses.GetTaskLists>;
        }

    updateTaskList(req: Requests.UpdateTaskList):
        Observable<Responses.UpdateTaskList> {
            return this.httpClient
                .post(Routes.UpdateTaskList, req)
                .pipe(take(1)) as Observable<Responses.UpdateTaskList>;
        }

    deleteTaskList(req: Requests.DeleteTaskList):
        Observable<Responses.DeleteTaskList> {
            return this.httpClient
                .post(Routes.DeleteTaskList, req)
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
                .post(Routes.GetTasks, req)
                .pipe(take(1)) as Observable<Responses.GetTasks>;
        }


    updateTask(req: Requests.UpdateTask):
        Observable<Responses.UpdateTask> {
            return this.httpClient
                .post(Routes.UpdateTask, req)
                .pipe(take(1)) as Observable<Responses.UpdateTask>;
        }

    deleteTask(req: Requests.DeleteTask):
        Observable<Responses.DeleteTask> {
            return this.httpClient
                .post(Routes.DeleteTask, req)
                .pipe(take(1)) as Observable<Responses.DeleteTask>
        }


    // Intake Log Entries
    createLogEntry(req: Requests.CreateLogEntry):
        Observable<Responses.CreateLogEntry> {
            return this.httpClient
                .post(Routes.CreateLogEntry, req)
                .pipe(take(1), map(dateify)) as Observable<Responses.CreateLogEntry>;
        }

    getLogEntries(req: Requests.GetLogEntries):
        Observable<Responses.GetLogEntries> {
            return this.httpClient
                .post(Routes.GetLogEntries, req)
                .pipe(take(1), map(dateify)) as Observable<Responses.GetLogEntries>;
        }


    updateLogEntry(req: Requests.UpdateLogEntry):
        Observable<Responses.UpdateLogEntry> {
            return this.httpClient
                .post(Routes.UpdateLogEntry, req)
                .pipe(take(1), map(dateify)) as Observable<Responses.UpdateLogEntry>;
        }

    deleteLogEntry(req: Requests.DeleteLogEntry):
        Observable<Responses.DeleteLogEntry> {
            return this.httpClient
                .post(Routes.DeleteLogEntry, req)
                .pipe(take(1)) as Observable<Responses.DeleteLogEntry>
        }
}
