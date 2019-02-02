import { Document, Types } from "mongoose";

export interface Task extends Types.Subdocument {
    name: string;
}

export interface TaskList extends Document {
    name: string;
    description: string;
}