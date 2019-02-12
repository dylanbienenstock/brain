import { Request, Response } from "express";

import { Routes } from "../../shared/routes";
import { AuthResult } from "../../shared/responses";
import { join } from "path";
import { readFile, readdir } from "fs";

enum Passcode {
    DEFAULT = "6267",
    MANAGE_KEYS = "8081"
}

export module Auth {
    let keys: { [name: string]: string } = {};

    export function loadKeys() {
        let keyDir = join(__dirname, "../keys/");
        let keyCount = 0;

        function readFiles(dirname, onFileContent, onError) {
            readdir(dirname, (err, filenames) => {
                if (err) {
                    onError(err);
                    return;
                }

                filenames.forEach((filename) => {
                    readFile(join(dirname, filename), "utf-8", (err, content) => {
                        if (err) {
                            onError(err);
                            return;
                        }

                        onFileContent(filename, content.trim());
                    });
                });
            });
        }

        readFiles(keyDir, (filename, content) => {
            keys[filename] = content;
            keyCount++;
        }, (err) => {
            throw err;
        });
    }

    export function authenticate(passcode: string, key?: string, keyName?: string): AuthResult {
        let keyValid = () => {
            return key && 
                   keyName && 
                   keys[keyName] && 
                   keys[keyName] == key;
        }

        switch (passcode) {
            case Passcode.DEFAULT:
                if (!keyValid()) return AuthResult.INVALID;

                return AuthResult.VALID;
            case Passcode.MANAGE_KEYS:
                return AuthResult.MANAGE_KEYS;
            default:
                return AuthResult.INVALID;
        }
    }

    export function middleware(req: Request, res: Response, next: () => void) {
        switch (req.url) {
            case "/authenticate":
            case "/keys":
            case Routes.Authenticate:
                next();
                    return;
        }

        let passcode = req.header("B-PASSCODE");
        let key = req.header("B-KEY");
        let keyName = req.header("B-KEY-NAME");

        let authResult = authenticate(passcode, key, keyName);

        switch (authResult) {
            case AuthResult.MANAGE_KEYS:
            case AuthResult.INVALID:
                res.redirect("/authenticate");
                    return;
            case AuthResult.VALID:
                next();
                    break;
        }
    }
}