import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, "Task name is required"]
    }
},
{ timestamps: true });

const taskListSchema = new Schema({
    name: {
        type: String,
        required: [true, "Task list name is required"]
    },
    description: String,
    tasks: [taskSchema]
},
{ timestamps: true });

const TaskListModel = model("TaskList", taskListSchema);

export { TaskListModel }