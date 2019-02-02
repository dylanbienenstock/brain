export module Requests {
    export interface SubmitPasscode {
        code: string;
    }

    export interface CreateTaskList {
        name: string;
    }

    export interface GetTaskLists { }

    export interface UpdateTaskList {
        _id: string;
        name: string;
        description: string;
    }

    export interface DeleteTaskList {
        _id: string;
    }
}