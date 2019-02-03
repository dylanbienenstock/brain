import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    name: String,
    description: String,
    date: String,
    completed: Boolean,
    urgent: Boolean
},
{ timestamps: true });

const taskListSchema = new Schema({
    name: String,
    description: String,
    tasks: [taskSchema]
},
{ timestamps: true });

const TaskListModel = model("TaskList", taskListSchema);

export { TaskListModel }