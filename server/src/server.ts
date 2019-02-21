import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { join } from "path";

import { Router } from "./server.router";
import { Auth } from "./server.auth";
import { OfflineMiddleware } from "./server.offline";
import { TaskListModel } from "./task-list/task-list.schemas";

const app: express.Application = express();

(async function initialize() {
    await mongoose.connect("mongodb://localhost/dylans-brain", { useNewUrlParser: true });
    mongoose.set("useFindAndModify", false);

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(express.static(join(__dirname, "../../client/dist/client")));
    app.use(Auth.middleware);
    app.use(OfflineMiddleware.express);

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