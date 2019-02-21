import { model, Schema } from "mongoose";
import { OfflineMiddleware } from "../server.offline";
import { Routes } from "../../../shared/routes";

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

taskSchema.plugin(OfflineMiddleware.mongoose, <OfflineMiddleware.MongooseOptions> {
    createRoute: Routes.CreateTask,
    isSubDocument: true
});

taskListSchema.plugin(OfflineMiddleware.mongoose, <OfflineMiddleware.MongooseOptions> {
    model: "TaskList",
    createRoute: Routes.CreateTaskList,
    subDocumentArrays: [{
        path: "tasks",
        createRoute: Routes.CreateTask
    }]
});

const TaskListModel = model("TaskList", taskListSchema);

export { TaskListModel }