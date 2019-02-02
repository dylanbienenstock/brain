import { TaskList } from "./task-list.types";
import { TaskListModel } from "./task-list.schemas";
import { Responses } from "../../../shared/responses";
import { Requests } from "../../../shared/requests";

export module TaskListModule {
    export async function createTaskList(req: Requests.CreateTaskList): 
        Promise<Responses.CreateTaskList> {
            let newTaskList = new TaskListModel(<TaskList> { name: req.name });
            let savedTaskList;

            await newTaskList.save()
                .then((taskList: TaskList) => {
                    savedTaskList = taskList;
                }).catch();

            if (!savedTaskList) return { success: false };

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

            await TaskListModel.findByIdAndUpdate(req._id, <TaskList> {
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

            await TaskListModel.findOneAndDelete({ _id: req._id })
                .then((taskList: TaskList) => {
                    console.log("del: ", taskList);
                }).catch(() => {
                    error = true;
                });

            return { success: !error };
        }
}