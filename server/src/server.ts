import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as https from "https";
import { readFileSync } from "fs";

import { join } from "path";

import { Router } from "./server.router";
import { Actions } from "./server.actions";
import { Auth } from "./server.auth";

const app: express.Application = express();

(function initialize() {
    mongoose.connect("mongodb://localhost/dylans-brain", { useNewUrlParser: true });

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(express.static(join(__dirname, "../../client/dist/client")));
    app.use(Auth.middleware);

    Auth.loadKeys();
    Router.initialize(app);

    app.get("*", (req, res) => {
        res.header("Service-Worker-Allowed", "/");
        res.sendFile(join(__dirname, "../../client/dist/client/index.html"));
    });

    listen();
})();

function listen() {
    let port: string = process.env.port || "8000";

    app.listen(port, () => {
        console.log(`[HTTP] Listening on port ${port}`);
    });
}