import { ITaskList, ITask } from "../server/src/task-list/task-list.types";

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
}