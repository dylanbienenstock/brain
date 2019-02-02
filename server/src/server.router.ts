import { Application, Request, Response, response } from "express";

import { Actions } from "./server.actions";
import { Routes } from "../../shared/routes";
import { Responses } from "../../shared/responses";

export module Router {
    export function initialize(app: Application) {
        app.post(Routes.submitPasscode, (req: Request, res: Response) => {
            Actions.submitPasscode(req)
                .then((response: Responses.SubmitPasscode) => {
                    res.send(response);
                });
        });

        app.post(Routes.getTaskLists, (req: Request, res: Response) => {
            Actions.getTaskLists(req)
                .then((response: Responses.GetTaskLists) => {
                    res.send(response);
                });
        });

        app.post(Routes.createTaskList, (req: Request, res: Response) => {
            Actions.createTaskList(req)
                .then((response: Responses.CreateTaskList) => {
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
    }
}