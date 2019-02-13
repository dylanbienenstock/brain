import { Routes } from "../../../../shared/routes";

export enum CacheReq {
    NEVER = 0,
    ALWAYS = 1,
    ONE = 2
}

export enum CacheRes {
    NEVER = 0,
    ALWAYS = 1
}

export interface CacheRule {
    req: CacheReq;
    res: CacheRes;
}

let cacheRules: { [key: string]: CacheRule } = {};

let defaultCacheRules: CacheRule  = { req: CacheReq.NEVER,  res: CacheRes.NEVER };

cacheRules[Routes.Authenticate]   = { req: CacheReq.NEVER,  res: CacheRes.NEVER };
cacheRules[Routes.UploadKey]      = { req: CacheReq.NEVER,  res: CacheRes.NEVER };

cacheRules[Routes.CreateTaskList] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };
cacheRules[Routes.GetTaskLists]   = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateTaskList] = { req: CacheReq.ONE,    res: CacheRes.NEVER };
cacheRules[Routes.DeleteTaskList] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };

cacheRules[Routes.createTask]     = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };
cacheRules[Routes.GetTasks]       = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateTask]     = { req: CacheReq.ONE,    res: CacheRes.NEVER };
cacheRules[Routes.DeleteTask]     = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };

cacheRules[Routes.CreateLogEntry] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };
cacheRules[Routes.GetLogEntries]  = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateLogEntry] = { req: CacheReq.ONE,    res: CacheRes.NEVER };
cacheRules[Routes.DeleteLogEntry] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER };

export function getCacheRules(url: string): CacheRule {
    return cacheRules[url] || defaultCacheRules;
}