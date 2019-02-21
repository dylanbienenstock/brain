import { TaskList, Task } from "../server/src/task-list/task-list.types";
import { LogEntry } from "../server/src/intake-log/intake-log.types";
import { OfflineDocument } from "../server/src/server.types";

export enum AuthResult {
    VALID = 0,
    INVALID = 1,
    MANAGE_KEYS = 2
}

export module Responses {    
    export interface Generic {
        success: boolean;
        error?: any;
    }

    export interface Create {
        offlineId?: string;
    }


    // Authentication
    export interface Authenticate extends Generic {
        authResult: AuthResult;
    }

    export interface UploadKey extends Generic { }


    // Task Lists
    export interface CreateTaskList extends Generic, Create {
        taskList?: TaskList;
    }

    export interface GetTaskLists extends Generic {
        taskLists?: TaskList[];
    }
    
    export interface UpdateTaskList extends Generic {
        taskList?: TaskList;
    }

    export interface DeleteTaskList extends Generic { }


    // Tasks
    export interface CreateTask extends Generic, Create {
        task?: Task;
    }

    export interface GetTasks extends Generic {
        tasks?: Task[];
    }

    export interface UpdateTask extends Generic {
        task?: Task;
    }

    export interface DeleteTask extends Generic { }


    // Intake Log Entries
    export interface CreateLogEntry extends Generic, Create {
        entry?: LogEntry;
    }

    export interface GetLogEntries extends Generic {
        entries?: LogEntry[];
    }

    export interface UpdateLogEntry extends Generic {
        entry?: LogEntry;
    }

    export interface DeleteLogEntry extends Generic { }
}