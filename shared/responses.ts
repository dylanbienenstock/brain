import { TaskList, Task } from "../server/src/task-list/task-list.types";
import { LogEntry } from "../server/src/intake-log/intake-log.types";

export module Responses {
    interface GenericResponse {
        success: boolean;
        error?: any;
    }


    // Authentication
    export interface Authenticate extends GenericResponse { }


    // Task Lists
    export interface CreateTaskList extends GenericResponse {
        taskList?: TaskList;
    }

    export interface GetTaskLists extends GenericResponse {
        taskLists?: TaskList[];
    }
    
    export interface UpdateTaskList extends GenericResponse {
        taskList?: TaskList;
    }

    export interface DeleteTaskList extends GenericResponse { }


    // Tasks
    export interface CreateTask extends GenericResponse {
        task?: Task;
    }

    export interface GetTasks extends GenericResponse {
        tasks?: Task[];
    }

    export interface UpdateTask extends GenericResponse {
        task?: Task;
    }

    export interface DeleteTask extends GenericResponse { }


    // Intake Log Entries
    export interface CreateLogEntry extends GenericResponse {
        entry?: LogEntry;
    }

    export interface GetLogEntries extends GenericResponse {
        entries?: LogEntry[];
    }

    export interface UpdateLogEntry extends GenericResponse {
        entry?: LogEntry;
    }

    export interface DeleteLogEntry extends GenericResponse { }
}