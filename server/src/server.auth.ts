import { Request, Response } from "express";

import { Routes } from "../../shared/routes";
import { join } from "path";
import { readFile, readdir } from "fs";

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

            console.log(`Loaded key: ${filename}, length: ${content.length}.`);
        }, (err) => {
            throw err;
        });
    }

    export function valid(passcode: string, key: string, keyName: string) {
        return passcode == "1111" && keys[keyName] == key;
    }

    export function middleware(req: Request, res: Response, next: () => void) {
        if (req.url == "/authenticate" ||
            req.url == Routes.authenticate) {
            next(); return;
        }

        let passcode = req.header("B-PASSCODE");
        let key = req.header("B-KEY");
        let keyName = req.header("B-KEY-NAME");

        console.log({ passcode, key, keyName })

        if (!valid(passcode, key, keyName)) {
            res.redirect("/authenticate"); return;
        }

        next();
    }
}