import { Request } from "express";
import { Requests } from "../../shared/requests";
import { Responses } from "../../shared/responses";
import { TaskListModule } from "./task-list/task-list.module";
import { IntakeLogModule } from "./intake-log/intake-log.module";
import { Auth } from "./server.auth";

export module Actions {

    export async function authenticate(req: Request):
        Promise<Responses.Authenticate> {
            let passcode = req.header("B-PASSCODE");
            let keyName = req.header("B-KEY-NAME");
            let key = req.header("B-KEY").trim();
            let success = Auth.valid(passcode, key, keyName);

            return <Responses.Authenticate> { success };
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


    // Intake Log Entries
    export async function createLogEntry(req: Request):
        Promise<Responses.CreateLogEntry> {
            return IntakeLogModule
                .createLogEntry(req.body as Requests.CreateLogEntry);
        }

    export async function getLogEntries(req: Request):
        Promise<Responses.GetLogEntries> {
            return IntakeLogModule
                .getLogEntries(req.body as Requests.GetLogEntries);
        }

    export async function updateLogEntry(req: Request):
        Promise<Responses.UpdateLogEntry> {
            return IntakeLogModule
                .updateLogEntry(req.body as Requests.UpdateLogEntry);
        }

    export async function deleteLogEntry(req: Request):
        Promise<Responses.DeleteLogEntry> {
            return IntakeLogModule
                .deleteLogEntry(req.body as Requests.DeleteLogEntry);
        }
}