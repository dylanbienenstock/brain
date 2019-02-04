export enum Routes {
    // Authentication
    authenticate = "/api/authenticate",

    // Task Lists
    createTaskList = "/api/tasklist/create",
    getTaskLists = "/api/tasklist/getAll",
    updateTaskList = "/api/tasklist/update",
    deleteTaskList = "/api/tasklist/delete",

    // Tasks
    createTask = "/api/task/create",
    getTasks = "/api/task/get",
    updateTask = "/api/task/update",
    deleteTask = "/api/task/delete",
}