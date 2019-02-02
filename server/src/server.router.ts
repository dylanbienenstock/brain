import { Application, Request, Response } from "express";

import { Actions } from "./server.actions";
import { Routes } from "../../shared/routes";
import { Responses } from "../../shared/responses";

export module Router {
    export function initialize(app: Application) {
        app.post(Routes.submitPasscode, (req: Request, res: Response) => {
            Actions.submitPasscode(req).then((response: Responses.SubmitPasscode) => {
                res.send(response);
            });
        });
    }
}