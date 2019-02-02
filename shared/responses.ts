import { TaskList } from "../server/src/task-list/task-list.types";

export module Responses {
    interface Res {
        success: boolean;
    }

    export interface SubmitPasscode extends Res { }

    export interface CreateTaskList extends Res {
        taskList?: TaskList;
    }

    export interface GetTaskLists extends Res {
        taskLists?: TaskList[];
    }
    
    export interface UpdateTaskList extends Res {
        taskList?: TaskList;
    }

    export interface DeleteTaskList extends Res { }
}