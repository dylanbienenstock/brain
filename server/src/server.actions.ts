import { Request, Response } from "express";
import { Requests } from "../../shared/requests";
import { Responses } from "../../shared/responses";
import { Routes } from "../../shared/routes";

export module Actions {
    export function passcodeCorrect(code: string) {
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

        next(); return;
    }

    export async function submitPasscode(req: Request): Promise<Responses.SubmitPasscode> {
        let passcode = req.header("B-PASSCODE");

        return <Responses.SubmitPasscode> {
            correct: passcodeCorrect(passcode)
        };
    }
}