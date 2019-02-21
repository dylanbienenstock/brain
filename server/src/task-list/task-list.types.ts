import { Document } from "mongoose";
import { Subdocument, Timestamps, HasDocumentArray, OfflineDocument } from "../server.types";

export interface ITask {
    name: string;
    description: string;
    date: string;
    completed: boolean;
    urgent: boolean;
}

export interface Task extends ITask, Subdocument, OfflineDocument, Timestamps { }


export interface ITaskList {
    name: string;
    description: string;
    tasks?: Task[];
}

export interface TaskList extends ITaskList, Document, OfflineDocument, HasDocumentArray, Timestamps { }