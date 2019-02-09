export enum Routes {
    // Authentication
    Authenticate = "/api/authenticate",

    // Task Lists
    CreateTaskList = "/api/tasklist/create",
    GetTaskLists = "/api/tasklist/getAll",
    UpdateTaskList = "/api/tasklist/update",
    DeleteTaskList = "/api/tasklist/delete",

    // Tasks
    createTask = "/api/task/create",
    GetTasks = "/api/task/get",
    UpdateTask = "/api/task/update",
    DeleteTask = "/api/task/delete",

    // Intake Log Entries
    CreateLogEntry = "/api/log-entry/create",
    GetLogEntries = "/api/log-entry/get",
    UpdateLogEntry = "/api/log-entry/update",
    DeleteLogEntry = "/api/log-entry/delete",
}