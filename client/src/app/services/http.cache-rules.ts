import { Routes } from "../../../../shared/routes";

export enum CacheReq {
    NEVER = 0,  // Never cache requests of this type
    ALWAYS = 1, // Cache all requests of this type
    ONE = 2     // Cache only the most recent request of this type
}

export enum CacheRes {
    NEVER = 0,      // Never cache requests of this type
    ALWAYS = 1,     // Cache all responses of this type
    CACHE_FIRST = 2 // ALWAYS, but return cached responses before mock responses
}

export interface CacheRule {
    req: CacheReq;
    res: CacheRes;
}

let cacheRules: { [key: string]: CacheRule } = {};

let defaultCacheRules: CacheRule  = { req: CacheReq.NEVER,  res: CacheRes.NEVER  };

cacheRules[Routes.Authenticate]   = { req: CacheReq.NEVER,  res: CacheRes.NEVER };
cacheRules[Routes.UploadKey]      = { req: CacheReq.NEVER,  res: CacheRes.NEVER  };

cacheRules[Routes.CreateTaskList] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };
cacheRules[Routes.GetTaskLists]   = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateTaskList] = { req: CacheReq.ONE,    res: CacheRes.NEVER  };
cacheRules[Routes.DeleteTaskList] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };

cacheRules[Routes.CreateTask]     = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };
cacheRules[Routes.GetTasks]       = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateTask]     = { req: CacheReq.ONE,    res: CacheRes.NEVER  };
cacheRules[Routes.DeleteTask]     = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };

cacheRules[Routes.CreateLogEntry] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };
cacheRules[Routes.GetLogEntries]  = { req: CacheReq.NEVER,  res: CacheRes.ALWAYS };
cacheRules[Routes.UpdateLogEntry] = { req: CacheReq.ONE,    res: CacheRes.NEVER  };
cacheRules[Routes.DeleteLogEntry] = { req: CacheReq.ALWAYS, res: CacheRes.NEVER  };

export function getCacheRules(url: string): CacheRule {
    return cacheRules[url] || defaultCacheRules;
}