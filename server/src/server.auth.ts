import { Request, Response } from "express";

import * as upash from "upash";
import * as argon2 from "@phc/argon2";
import * as Keyv from "keyv";

import { Routes } from "../../shared/routes";
import { AuthResult, Responses } from "../../shared/responses";

enum Passcode {
    DEFAULT = "6267",
    MANAGE_KEYS = "8081"
}

enum KeyvStore {
    AUTH_KEYS = "keys",
    KEY_UPLOAD_PASSWORD = "key-upload-password"
}

let authKeys: { [name: string]: string } = { };
let keyv: Keyv;

export module Auth {
    export async function loadKeys() {
        upash.install("argon2", argon2);

        keyv = new Keyv("mongodb://localhost:27017/dylans-brain-keyv");

        keyv.on("error", err => console.log("[KEYV]", err));

        authKeys = await keyv.get(KeyvStore.AUTH_KEYS);

        if (!authKeys) {
            authKeys = { };
            keyv.set(KeyvStore.AUTH_KEYS, { });
        }

        for (let keyName in authKeys) {
            console.log("[AUTH] Loaded key: " + keyName);
        }
    }

    export async function saveKey(password: string, key: string, keyName: string): Promise<Responses.UploadKey> {
        let passwordHash = await keyv.get(KeyvStore.KEY_UPLOAD_PASSWORD);
        let passwordValid = await upash.verify(passwordHash, password);

        if (!passwordHash || !passwordValid) {
            return {
                success: false,
                error: "Incorrect key upload password."
            };
        }
        
        if (authKeys[keyName]) {
            return {
                success: false,
                error: "Key already exists."
            };
        }

        authKeys[keyName] = key;
        await keyv.set(KeyvStore.AUTH_KEYS, authKeys);

        console.log(`[AUTH] Saved key: ${ keyName }`);

        return { success: true };
    }

    export function authenticate(passcode: string, key?: string, keyName?: string): AuthResult {
        let keyValid = () => {
            return key && 
                   keyName && 
                   authKeys[keyName] && 
                   authKeys[keyName] == key;
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
            case Routes.UploadKey:
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