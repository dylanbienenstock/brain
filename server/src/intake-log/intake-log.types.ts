import { Document } from "mongoose";
import { Timestamps } from "../server.types";


export interface ILogEntry {
    name: string;
    description: string;
    amount: string;
    isFood: boolean;
    notable: boolean;
    date: Date;
}

export interface LogEntry extends ILogEntry, Document, Timestamps { }