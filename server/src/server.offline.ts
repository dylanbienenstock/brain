import { Schema, HookNextFunction, Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { Subdocument } from "./server.types";

export module OfflineMiddleware {
    let offlineIds: { [schemaName: string]: string[] } = { };

    export interface MongooseOptions {
        createRoute: string,
        isSubDocument?: boolean,
        model?: string,
        subDocumentArrays?: {
            path: string,
            createRoute: string
        }[]
    }

    export function mongoose(schema: Schema, options: MongooseOptions) {
        offlineIds[options.createRoute] = [];

        schema.add({ offlineId: String });

        if (!options.isSubDocument && options.subDocumentArrays && options.model) {
            schema.method("updateSubdocument", function(path: string, _id: string, update: any) {
                return new Promise((resolve, reject) => {
                    let docArr = (this[path] as any[]);

                    if (!docArr) return reject("Invalid path.");

                    let subdoc: any;
    
                    if (_id.startsWith("OFFLINE:")) {
                        subdoc = docArr.find(sd => sd.get("offlineId") == _id);
                    } else {
                        subdoc = docArr.find(sd => sd._id == _id);
                        update["offlineId"] = null;              
                    }

                    if (!subdoc) return reject("Cannot find subdocument.");

                    subdoc.set(update);

                    resolve();
                });
            });
        }

        function replaceIds(next: HookNextFunction) {
            let query = this.getQuery();

            if (Object.keys(query).length > 1) return next();
            if (!query._id || !query._id.startsWith("OFFLINE:")) return next();
    
            this.setQuery({ offlineId: query._id });

            next();
        }

        schema.pre("findOne", replaceIds);
        schema.pre("findOneAndUpdate", replaceIds);

        schema.pre("save", function(next: HookNextFunction) {
            if (this.get("offlineId")) return next();
            if (offlineIds[options.createRoute].length == 0) return next();

            let offlineId = offlineIds[options.createRoute].pop();

            this.set("offlineId", offlineId);

            next();
        });
    }
    
    export function express(req: Request, res: Response, next: NextFunction) {
        if (!offlineIds[req.url]) return next();
        if (!req || !req.body || !req.body.offlineId) return next();

        offlineIds[req.url].push(req.body.offlineId);

        next();
    }
}