import { Application, Request, Response, response } from "express";

import { Actions } from "./server.actions";
import { Routes } from "../../shared/routes";
import { Responses } from "../../shared/responses";

export module Router {
    export function initialize(app: Application) {

        // Authentication
        app.post(Routes.Authenticate, (req: Request, res: Response) => {
            Actions.authenticate(req)
                .then((response: Responses.Authenticate) => {
                    res.send(response);
                });
        });

        
        // Task Lists
        app.post(Routes.CreateTaskList, (req: Request, res: Response) => {
            Actions.createTaskList(req)
                .then((response: Responses.CreateTaskList) => {
                    res.send(response);
                });
        });

        app.post(Routes.GetTaskLists, (req: Request, res: Response) => {
            Actions.getTaskLists(req)
                .then((response: Responses.GetTaskLists) => {
                    res.send(response);
                });
        });

        app.post(Routes.UpdateTaskList, (req: Request, res: Response) => {
            Actions.updateTaskList(req)
                .then((response: Responses.UpdateTaskList) => {
                    res.send(response);
                });
        });

        app.post(Routes.DeleteTaskList, (req: Request, res: Response) => {
            Actions.deleteTaskList(req)
                .then((response: Responses.DeleteTaskList) => {
                    res.send(response);
                });
        });


        // Tasks
        app.post(Routes.createTask, (req: Request, res: Response) => {
            Actions.createTask(req)
                .then((response: Responses.CreateTask) => {
                    res.send(response);
                });
        });

        app.post(Routes.GetTasks, (req: Request, res: Response) => {
            Actions.getTasks(req)
                .then((response: Responses.GetTasks) => {
                    res.send(response);
                });
        });

        app.post(Routes.UpdateTask, (req: Request, res: Response) => {
            Actions.updateTask(req)
                .then((response: Responses.UpdateTask) => {
                    res.send(response);
                });
        });

        app.post(Routes.DeleteTask, (req: Request, res: Response) => {
            Actions.deleteTask(req)
                .then((response: Responses.DeleteTask) => {
                    res.send(response);
                });
        });


        // Intake Log Entries
        app.post(Routes.CreateLogEntry, (req: Request, res: Response) => {
            Actions.createLogEntry(req)
                .then((response: Responses.CreateLogEntry) => {
                    res.send(response);
                });
        });

        app.post(Routes.GetLogEntries, (req: Request, res: Response) => {
            Actions.getLogEntries(req)
                .then((response: Responses.GetLogEntries) => {
                    res.send(response);
                });
        });

        app.post(Routes.UpdateLogEntry, (req: Request, res: Response) => {
            Actions.updateLogEntry(req)
                .then((response: Responses.UpdateLogEntry) => {
                    res.send(response);
                });
        });

        app.post(Routes.DeleteLogEntry, (req: Request, res: Response) => {
            Actions.deleteLogEntry(req)
                .then((response: Responses.DeleteLogEntry) => {
                    res.send(response);
                });
        });
    }
}