import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Routes } from '../../../../shared/routes';
import { Responses, AuthResult } from '../../../../shared/responses';
import { Requests } from '../../../../shared/requests';
import { TaskList, Task } from '../../../../server/src/task-list/task-list.types';
import { LogEntry } from '../../../../server/src/intake-log/intake-log.types';
import { ResponseCacheService } from './response-cache.service';

@Injectable({
    providedIn: 'root'
})
export class OfflineService {
    
    constructor(private responseCacheService: ResponseCacheService) {
        this.actions = { };
        this.actions[Routes.Authenticate]   = this.authenticate.bind(this);
        this.actions[Routes.CreateTaskList] = this.createTaskList.bind(this);
        this.actions[Routes.CreateTask]     = this.createTask.bind(this);
        this.actions[Routes.CreateLogEntry] = this.createLogEntry.bind(this);
    }
    
    private actions: { [url: string]: (req) => Responses.Generic };

    private offlineId() {
        let id = "";
        let randomBytes = new Uint8Array(16);
        
        crypto.getRandomValues(randomBytes);
        randomBytes.forEach(b => id += b.toString());

        return "OFFLINE:" + id;
    }

    public getMockResponse(req: HttpRequest<any>) {
        console.log("ACTIONS", this.actions, "URL", req.url, "SSS", this.actions[req.url]);

        if (!this.actions[req.url]) return null;

        let body = this.actions[req.url](req.body);

        return new HttpResponse({ body });
    }


    private authenticate(): Responses.Authenticate {
        return {
            success: false,
            authResult: AuthResult.INVALID
        };
    }

    private createTaskList(req: Requests.CreateTaskList): Responses.CreateTaskList {
        return {
            success: true,
            taskList: <TaskList> {
                _id: this.offlineId(),
                name: req.name,
                description: "",
                tasks: null
            }
        };
    }

    private createTask(req: Requests.CreateTask): Responses.CreateTask {
        return {
            success: true,
            task: <Task> {
                _id: this.offlineId(),
                name: req.name,
                description: "",
                date: "",
                completed: false,
                urgent: false
            }
        };
    }

    private createLogEntry(req: Requests.CreateLogEntry): Responses.CreateLogEntry {
        return {
            success: true,
            entry: <LogEntry> {
                _id: this.offlineId(),
                name: req.name,
                description: "",
                amount: "",
                isFood: true,
                notable: false,
                date: req.date
            }
        };
    }
}
