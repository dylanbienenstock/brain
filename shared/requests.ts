import { ITaskList, ITask } from "../server/src/task-list/task-list.types";
import { ILogEntry } from "../server/src/intake-log/intake-log.types";

export module Requests {
    // Authentication
    export interface Authenticate {
        code: string;
        key: string;
    }


    // Task Lists
    export interface CreateTaskList {
        name: string;
    }

    export interface GetTaskLists { }

    export interface UpdateTaskList extends ITaskList {
        listId: string;
    }

    export interface DeleteTaskList {
        listId: string;
    }


    // Tasks
    export interface CreateTask {
        listId: string;
        name: string;
    }

    export interface GetTasks {
        listId: string;
    }

    export interface UpdateTask extends ITask {
        listId: string;
        taskId: string;
    }

    export interface DeleteTask {
        listId: string;
        taskId: string;
    }


    // Intake Log Entries
    export interface CreateLogEntry {
        name: string;
        date: Date;
    }

    export interface GetLogEntries {
        year: number;
        month: number;
    }

    export interface UpdateLogEntry extends ILogEntry {
        entryId: string;
    }

    export interface DeleteLogEntry {
        entryId: string;
    }
}