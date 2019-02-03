import { Request, Response } from "express";
import { Requests } from "../../shared/requests";
import { Responses } from "../../shared/responses";
import { Routes } from "../../shared/routes";
import { TaskListModule } from "./task-list/tast-list.module";

export module Actions {

    // Authentication
    function passcodeCorrect(code: string) {
        return code == "1111";
    }

    export function authenticate(req: Request, res: Response, next: () => void) {
        if (req.url == "/authenticate" ||
            req.url == Routes.submitPasscode) {
                next(); return;
        }

        let passcode = req.header("B-PASSCODE");

        if (!passcodeCorrect(passcode)) {
            res.redirect("/authenticate"); return;
        }

        next();
    }

    export async function submitPasscode(req: Request):
        Promise<Responses.SubmitPasscode> {
            let passcode = req.header("B-PASSCODE");

            return <Responses.SubmitPasscode> {
                success: passcodeCorrect(passcode)
            };
        }


    // Task Lists
    export async function createTaskList(req: Request):
        Promise<Responses.CreateTaskList> {
            return TaskListModule
                .createTaskList(req.body as Requests.CreateTaskList);
        }

    export async function getTaskLists(req: Request):
        Promise<Responses.GetTaskLists> {
            return TaskListModule
                .getTaskLists(req.body as Requests.GetTaskLists);
        }

    export async function updateTaskList(req: Request):
        Promise<Responses.UpdateTaskList> {
            return TaskListModule
                .updateTaskList(req.body as Requests.UpdateTaskList);
        }

    export async function deleteTaskList(req: Request):
        Promise<Responses.DeleteTaskList> {
            return TaskListModule
                .deleteTaskList(req.body as Requests.DeleteTaskList);
        }

        
    // Tasks
    export async function createTask(req: Request):
        Promise<Responses.CreateTask> {
            return TaskListModule
                .createTask(req.body as Requests.CreateTask);
        }

    export async function getTasks(req: Request):
        Promise<Responses.GetTasks> {
            return TaskListModule
                .getTasks(req.body as Requests.GetTasks);
        }

    export async function updateTask(req: Request):
        Promise<Responses.UpdateTask> {
            return TaskListModule
                .updateTask(req.body as Requests.UpdateTask);
        }

    export async function deleteTask(req: Request):
        Promise<Responses.DeleteTask> {
            return TaskListModule
                .deleteTask(req.body as Requests.DeleteTask);
        }
}