import { Application, Request, Response, response } from "express";

import { Actions } from "./server.actions";
import { Routes } from "../../shared/routes";
import { Responses } from "../../shared/responses";

export module Router {
    export function initialize(app: Application) {

        // Authentication
        app.post(Routes.submitPasscode, (req: Request, res: Response) => {
            Actions.authenticate(req)
                .then((response: Responses.Authenticate) => {
                    res.send(response);
                });
        });

        
        // Task Lists
        app.post(Routes.createTaskList, (req: Request, res: Response) => {
            Actions.createTaskList(req)
                .then((response: Responses.CreateTaskList) => {
                    res.send(response);
                });
        });

        app.post(Routes.getTaskLists, (req: Request, res: Response) => {
            Actions.getTaskLists(req)
                .then((response: Responses.GetTaskLists) => {
                    res.send(response);
                });
        });

        app.post(Routes.updateTaskList, (req: Request, res: Response) => {
            Actions.updateTaskList(req)
                .then((response: Responses.UpdateTaskList) => {
                    res.send(response);
                });
        });

        app.post(Routes.deleteTaskList, (req: Request, res: Response) => {
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

        app.post(Routes.getTasks, (req: Request, res: Response) => {
            Actions.getTasks(req)
                .then((response: Responses.GetTasks) => {
                    res.send(response);
                });
        });

        app.post(Routes.updateTask, (req: Request, res: Response) => {
            Actions.updateTask(req)
                .then((response: Responses.UpdateTask) => {
                    res.send(response);
                });
        });

        app.post(Routes.deleteTask, (req: Request, res: Response) => {
            Actions.deleteTask(req)
                .then((response: Responses.DeleteTask) => {
                    res.send(response);
                });
        });
    }
}