import { TaskList, Task, ITask } from "./task-list.types";
import { TaskListModel } from "./task-list.schemas";
import { Responses } from "../../../shared/responses";
import { Requests } from "../../../shared/requests";
import { Types } from "mongoose";

export module TaskListModule {

    // Task Lists
    export async function createTaskList(req: Requests.CreateTaskList): 
        Promise<Responses.CreateTaskList> {
            let newTaskList = new TaskListModel(<TaskList> { name: req.name });
            let savedTaskList: TaskList;
            let error: boolean;

            await newTaskList.save()
                .then((taskList: TaskList) => {
                    savedTaskList = taskList;
                }).catch(() => {
                    error = true;
                });

            if (!savedTaskList || error) return { success: false };

            return {
                success: true,
                taskList: savedTaskList
            };
        }

    export async function getTaskLists(req: Requests.GetTaskLists):
        Promise<Responses.GetTaskLists> {
            let taskLists = [];
            let error = false;

            await TaskListModel.find()
                .select("-tasks")
                .then((_taskLists: TaskList[]) => {
                    taskLists = _taskLists;
                })
                .catch(() => {
                    error = true;
                });

            if (error) return { success: false };
            
            return {
                success: true,
                taskLists
            };
        }

    export async function updateTaskList(req: Requests.UpdateTaskList):
        Promise<Responses.UpdateTaskList> {
            let taskList;
            let error = false;

            await TaskListModel.findByIdAndUpdate(req.listId, <TaskList> {
                name: req.name,
                description: req.description
            }).then((_taskList: TaskList) => {
                taskList = _taskList;
            }).catch(() => {
                error = true;
            });

            if (error) return { success: false };

            return {
                success: true,
                taskList
            };
        }

    export async function deleteTaskList(req: Requests.DeleteTaskList):
        Promise<Responses.DeleteTaskList> {
            let error = false;

            await TaskListModel.findOneAndDelete({ _id: req.listId })
                .then()
                .catch(() => {
                    error = true;
                });

            return { success: !error };
        }


    // Tasks
    export async function createTask(req: Requests.CreateTask):
        Promise<Responses.CreateTask> {
            let taskList: TaskList;
            let task: Task;
            let error: boolean = false;

            await TaskListModel.findOne({ _id: req.listId })
                .then((_taskList: TaskList) => {
                    taskList = _taskList;
                }).catch(() => {
                    error = true;
                });

            if (!taskList || error) return { success: false };

            taskList.tasks.unshift(<Task> { name: req.name });

            await taskList.save()
                .then((taskList: TaskList) => {
                    if (!taskList) error = true;

                    task = taskList.tasks[0];
                }).catch(() => {
                    error = true;
                });

            if (!task || error) return { success: false };

            return {
                success: true,
                task
            };
        }

    export async function getTasks(req: Requests.GetTasks):
        Promise<Responses.GetTasks> {
            let tasks: Task[];
            let error: boolean = false;

            await TaskListModel.findOne({ _id: req.listId })
                .select("tasks")
                .then((taskList: TaskList) => {
                    tasks = taskList.tasks;
                }).catch(() => {
                    error = true;
                });

            if (error) return { success: false };

            return {
                success: true,
                tasks
            };
        }

    export async function updateTask(req: Requests.UpdateTask):
        Promise<Responses.UpdateTask> {
            let taskList: TaskList;
            let error: boolean = false;

            await TaskListModel.findOne({ _id: req.listId })
                .select("tasks")
                .then((_taskList: TaskList) => {
                    taskList = _taskList;
                }).catch(() => {
                    error = true;
                });

            if (error) return { success: false };

            let taskIndex = taskList.tasks
                .findIndex(t => t._id == req.taskId);

            if (taskIndex == -1) return { success: false };

            let task = taskList.tasks[taskIndex] as Task & Types.Subdocument;

            task.set(<ITask> {
                name: req.name,
                description: req.description,
                date: req.date,
                completed: req.completed,
                urgent: req.urgent
            });

            await taskList.save()
                .then()
                .catch(() => {
                    error = true;
                });

            return { success: !error };
        }

    export async function deleteTask(req: Requests.DeleteTask):
        Promise<Responses.DeleteTask> {
            let taskList: TaskList;
            let error: boolean = false;

            await TaskListModel.findOne({ _id: req.listId })
                .select("tasks")
                .then((_taskList: TaskList) => {
                    taskList = _taskList;
                }).catch(() => {
                    error = true;
                });

            if (error) return { success: false };

            let taskIndex = taskList.tasks
                .findIndex(t => t._id == req.taskId);

            if (taskIndex == -1) return { success: false };

            taskList.tasks.splice(taskIndex, 1);

            await taskList.save()
                .then()
                .catch(() => {
                    error = true;
                });

            return { success: !error };
        }
}