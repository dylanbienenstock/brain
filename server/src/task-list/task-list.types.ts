import { Document } from "mongoose";
import { Subdocument, Timestamps } from "../server.types";


export interface ITask {
    name: string;
    description: string;
    date: string;
    completed: boolean;
    urgent: boolean;
}

export interface Task extends ITask, Subdocument, Timestamps { }


export interface ITaskList {
    name: string;
    description: string;
    tasks?: Task[];
}

export interface TaskList extends ITaskList, Document, Timestamps { }