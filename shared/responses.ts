import { TaskList, Task } from "../server/src/task-list/task-list.types";

export module Responses {
    interface GenericResponse {
        success: boolean;
    }


    // Authentication
    export interface SubmitPasscode extends GenericResponse { }


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
}