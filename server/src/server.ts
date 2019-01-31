import * as express from "express";
import * as bodyParser from "body-parser";

import { join } from "path";

import { Router } from "./server.router";
import { Actions } from "./server.actions";

const app: express.Application = express();

(function initialize() {
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(express.static(join(__dirname, "../../client/dist/client")));
    app.use(Actions.authenticate);

    Router.initialize(app);

    app.get("*", (req, res) => {
        res.sendFile(join(__dirname, "../../client/dist/client/index.html"));
    });

    listen();
})();

function listen() {
    let port: string = process.env.port || "8000";

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}