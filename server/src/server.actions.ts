import { Request, Response } from "express";

export module Actions {
    export function authenticate(req: Request, res: Response, next: () => void) {
        console.log("URL", req.url);

        if (req.url == "/authenticate") {
            next(); return;
        }

        let passcode = req.header("B-PASSCODE");

        if (passcode == "1111") {
            next(); return;
        }

        res.send("Incorrect password.")
    }
}