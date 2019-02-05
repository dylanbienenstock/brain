import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { TaskList, Task } from '../../../../../server/src/task-list/task-list.types';
import { HttpService } from '../../services/http.service';
import { Responses } from '../../../../../shared/responses';
import { Requests } from '../../../../../shared/requests';
import { ScreenService } from '../../services/screen.service';
import { NavbarService, NavbarExtensionClickEvent } from '../../services/navbar.service';
import { Subscription } from 'rxjs';
import { StringUtilService } from '../../services/string-util.service';

import * as moment from "moment";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

    constructor(private httpService: HttpService,
                private stringUtilService: StringUtilService,
                public screenService: ScreenService,
                public navbarService: NavbarService) { }
    
    public taskLists: TaskList[] = [];
    public curListIndex: number;
    public curTaskIndex: number;

    public listSelected: boolean = false;
    public taskSelected: boolean = false;
    public focusedInput: string = "";

    public deletingLists: boolean = false;
    public deletingTasks: boolean = false;

    public defaultTaskListName: string = "<New Task List>";
    public defaultTaskName: string = "<New Task>";

    public listSymbol = "☰";
    public checkSymbol: string = "x";

    private saveDelay: number = 2500;
    private taskListDetailsModifiedTimeout;
    private taskDetailsModifiedTimeout;
    private navbarExtensionClickedSub: Subscription;
    private navbarExtensionOwner = "task-list";


    // Convenience
    public get curTaskList(): TaskList | null {
        return this.taskLists[this.curListIndex];
    }

    public get curTaskListId(): string | null {
        let taskList = this.curTaskList;

        if (!taskList) return;

        return taskList._id;
    }

    public get curTask(): Task | null {
        if (!this.curTaskList) return;

        return this.curTaskList.tasks[this.curTaskIndex]; 
    }

    public set curTask(val: Task) {
        this.curTaskList.tasks[this.curTaskIndex] = val;
    }

    public get curTaskId(): string | null {
        let task = this.curTask;

        if (!task) return;

        return task._id;
    }
    

    // Lifecycle
    ngOnInit() {
        this.getTaskLists();

        this.navbarExtensionClickedSub =
            this.navbarService.extensionClicked
                .subscribe((e: NavbarExtensionClickEvent) => {
                    this.onExtensionClicked(e);
                });
    }

    ngOnDestroy() {
        this.navbarExtensionClickedSub.unsubscribe();
    }


    findTaskListIndexById(listId: string) {
        return this.taskLists
            .findIndex(tl => tl._id == listId);
    }

    findTaskIndexById(listIndex: number, taskId: string) {
        if (listIndex == -1) return -1;

        return this.taskLists[listIndex].tasks
            .findIndex(t => t._id == taskId);        
    }

    onInputFocus(detail: string, input: HTMLInputElement, clearTaskFocus: boolean = false) {
        if (clearTaskFocus) {
            this.curTaskIndex = null;
            this.taskSelected = false;
        }

        setTimeout(() => {
            this.focusedInput = detail;
    
            setTimeout(() => {
                input.focus();
            });
        })
    }
    
    onInputBlur() {
        this.focusedInput = "";
    }


    // Navbar
    setNavbarExtensions() {
        let list = this.curTaskList;
        let listName = list && list.name;

        let task = this.curTask;
        let taskName = task && task.name

        this.navbarService
            .setExtensions(this.navbarExtensionOwner, [
                this.listSelected && (listName || "<Untitled>"),
                this.taskSelected && (taskName || "<Untitled>")
            ]);
    }

    onExtensionClicked(e: NavbarExtensionClickEvent) {
        if (e.owner != this.navbarExtensionOwner) return;

        switch (e.index) {
            case -1:
                this.curListIndex = null;
                this.listSelected = false;
            case 0:
                this.curTaskIndex = null;
                this.taskSelected = false;
                break;
        }

        this.setNavbarExtensions();
    }


    // Task Lists
    createTaskList(name: string) {
        this.httpService.createTaskList({ name })
        .subscribe((response: Responses.CreateTaskList) => {
            if (!response.success) {
                alert(`Failed to create task list.`);

                return;
            }

            this.taskLists.push(response.taskList);
            // this.onClickTaskList(this.taskLists.length - 1);
        });
    }

    getTaskLists() {
        this.httpService.getTaskLists()
            .subscribe((res: Responses.GetTaskLists) => {
                if (!res.success) {
                    alert("Failed to fetch task lists.");
                    return;
                }

                this.taskLists = res.taskLists
                    .map((tl): TaskList => {
                        return { ...tl, tasks: [] } as TaskList;
                    });
            });
    }

    updateTaskList(req: Requests.UpdateTaskList) {
        this.httpService.updateTaskList(req)
            .subscribe((res: Responses.UpdateTaskList) => {
                if (!res.success) alert("Failed to update task list.");
            });
    }

    deleteTaskList(listId: string) {
        this.httpService.deleteTaskList({ listId })
        .subscribe((res: Responses.UpdateTaskList) => {
            if (!res.success) {
                alert("Failed to delete task list.");
                return;
            }

            this.curListIndex = null;
            this.listSelected = false;

            let listIndex = this.findTaskListIndexById(listId);

            this.taskLists.splice(listIndex, 1);
            this.setNavbarExtensions();

            if (this.taskLists.length == 0) {
                this.deletingLists = false;
            }
        });
    }

    onCreateTaskList() {
        if (!this.taskLists) return;

        let name = this.defaultTaskListName;
        let otherNames = this.taskLists.map(tl => tl.name);

        name = this.stringUtilService.makeUnique(name, otherNames);

        this.createTaskList(name);
    }

    onClickTaskList(index: number) {
        if (!this.deletingLists) {
            this.curListIndex = index;
            this.listSelected = true;
    
            this.setNavbarExtensions();
    
            let listId = this.curTaskListId;
    
            if (listId == null) return;
    
            this.getTasks(listId);
        } else {
            this.onDeleteTaskList(index);
        }
    }

    onToggleDeletingTaskLists() {
        this.deletingLists = !this.deletingLists;

        if (this.deletingLists) {
            this.curListIndex = null;
            this.listSelected = false;
    
            this.curTaskIndex = null;
            this.taskSelected = false;

            this.setNavbarExtensions();
        }
    }

    onDeleteTaskList(index: number) {
        let list = this.taskLists[index];

        if (!list) return;
        
        this.deleteTaskList(list._id);
        this.setNavbarExtensions();
    }

    onTaskListDetailsModified() {
        this.setNavbarExtensions();

        clearTimeout(this.taskListDetailsModifiedTimeout);

        let taskList = { ...this.curTaskList };

        if (!taskList.name.trim()) {
            taskList.name = "<Untitled List>";
        }

        this.taskListDetailsModifiedTimeout = 
            setTimeout(() => {
                this.updateTaskList({
                    listId: taskList._id,
                    name: taskList.name,
                    description: taskList.description
                });
            }, this.saveDelay);
    }

    
    // Tasks
    createTask(listId: string, name: string) {
        this.httpService.createTask({ listId, name })
            .subscribe((res: Responses.CreateTask) => {
                if (!res.success) {
                    alert("Failed to create task.");
                    return;
                }

                let taskList = this.taskLists
                    .find(tl => tl._id == listId);

                taskList.tasks.unshift(res.task);
            });
    }

    getTasks(listId: string) {
        this.httpService.getTasks({ listId })
            .subscribe((res: Responses.GetTasks) => {
                if (!res.success) {
                    alert("Failed to get tasks.");
                    return;
                }

                let taskList = this.taskLists.find(tl => tl._id == listId);

                taskList.tasks = res.tasks;
            });
    }

    updateTask(req: Requests.UpdateTask) {
        this.httpService.updateTask(req)
            .subscribe((res: Responses.UpdateTask) => {
                if (!res.success) alert("Failed to update task.");
            });
    }

    deleteTask(listId: string, taskId: string) {
        this.httpService.deleteTask({ listId, taskId })
            .subscribe((res: Responses.DeleteTask) => {
                if (!res.success) {
                    alert("Failed to delete task.");
                    return;
                }

                let listIndex = this.findTaskListIndexById(listId);

                if (listIndex == -1) return;

                let taskIndex = this.findTaskIndexById(listIndex, taskId);

                if (taskIndex == -1) return;

                this.taskLists[listIndex].tasks.splice(taskIndex, 1);

                if (this.taskLists[listIndex].tasks.length == 0) {
                    this.deletingTasks = false;
                }
            });
    }

    onCreateTask() {
        let listId = this.curTaskListId;

        if (!listId) return;

        let name = this.defaultTaskName;
        let otherNames = this.curTaskList.tasks.map(t => t.name);

        name = this.stringUtilService.makeUnique(name, otherNames);

        this.createTask(listId, name);
    }

    onToggleDeletingTasks() {
        this.deletingTasks = !this.deletingTasks;

        if (this.deletingTasks) {
            this.curTaskIndex = null;
            this.taskSelected = false;

            this.setNavbarExtensions();
        }
    }

    onDeleteTask(index: number) {
        let listId = this.curTaskListId;
        let task = this.curTaskList.tasks[index];

        if (!task) return;

        this.curTaskIndex = null;
        this.taskSelected = false;

        this.deleteTask(listId, task._id);
        this.setNavbarExtensions();
    }

    onSelectTask(index: number) {
        this.curTaskIndex = index;
        this.taskSelected = true;

        this.setNavbarExtensions();
    }

    onCheckTask(index: number) {
        if (!this.listSelected) return;

        let task = this.curTaskList.tasks[index];

        task.completed = !task.completed;

        this.onTaskDetailsModified();
    }

    onToggleTaskProp(prop: string) {
        if (!this.taskSelected) return;

        this.curTask[prop] = !this.curTask[prop];

        this.curTask = { ...this.curTask };

        this.onTaskDetailsModified();
    }

    onTaskDetailsModified() {
        this.setNavbarExtensions();

        clearTimeout(this.taskDetailsModifiedTimeout);

        let listId = this.curTaskListId;
        let task = { ...this.curTask };

        if (!task.name.trim()) {
            task.name = "<Untitled Task>";
        }

        this.taskDetailsModifiedTimeout = 
            setTimeout(() => {
                this.updateTask({
                    listId,
                    taskId: task._id,
                    name: task.name,
                    description: task.description,
                    date: task.date,
                    completed: task.completed,
                    urgent: task.urgent
                });
            }, this.saveDelay);
    }

    dateEmpty(dateStr: string) {
        return !dateStr || !dateStr.trim();
    }

    dateValid(dateStr: string, acceptEmpty: boolean = false) {
        if (this.dateEmpty(dateStr)) return acceptEmpty;

        let date = this.parseDate(dateStr);

        if (!date) return false;

        return date.getTime() === date.getTime();
    }

    dateContainsTime(dateStr: string) {
        return dateStr.includes("@") && 
            (dateStr.includes("AM") || dateStr.includes("PM"));
    }

    parseDate(dateStr: string) {
        let regex = {
            MonthDayYearHourMinutePeriod: 
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)(?:,?\s|\/)(\d\d(?:\d\d)?)\s@\s([1-9][0-2]?):([0-6]\d)\s(AM|PM)$/,
            MonthDayYearHourPeriod: 
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)(?:,?\s|\/)(\d\d(?:\d\d)?)\s@\s([1-9][0-2]?)\s(AM|PM)$/,
            MonthDayHourMinutePeriod:
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)(?:\s|\/)@\s([1-9][0-2]?):([0-6]\d)\s(AM|PM)$/,
            MonthDayHourPeriod:
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)(?:\s|\/)@\s([1-9][0-2]?)\s(AM|PM)$/,
            MonthDayYear: 
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)(?:,?\s|\/)(\d\d(?:\d\d)?)$/,
            MonthDay:
                /^((?:[1-9][0-2]?)|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))(?:\s|\/)(\d\d?)$/,
        };
        
        let date = (() => {
            for (let regexName in regex) {
                let s = dateStr.match(regex[regexName]);

                if (!s) continue;

                s.shift();

                let n = (i) => {
                    return parseInt(s[i]);
                }

                let year = (i) => {
                    if (s[i].length == 2) {
                        return 2000 + n(i);
                    }

                    return n(i);
                }

                let month = (i) => {
                    let _n = n(i);
                    
                    if (isNaN(_n)) {
                        let months = [
                            "Jan", "Feb", "Mar", "Apr",
                            "May", "Jun", "Jul", "Aug",
                            "Sep", "Oct", "Nov", "Dec"
                        ];

                        return months.indexOf(s[i]);
                    }

                    return _n - 1;
                }

                let hour = (hI, pI) => {
                    let [tw, pm] = [s[hI] == "12", s[pI] == "PM"];

                    if (tw && !pm) return n(hI) - 12;

                    return n(hI);
                }

                let curYr = () => {
                    return new Date().getFullYear();
                }

                switch (regexName) {
                    case "MonthDayYearHourMinutePeriod":
                        return new Date(year(2), month(0), n(1), hour(3, 5), n(4));
                    case "MonthDayHourMinutePeriod":
                        return new Date(curYr(), month(0), n(1), hour(2, 4), n(3));
                    case "MonthDayHourPeriod":
                        return new Date(curYr(), month(0), n(1), hour(2, 3));
                    case "MonthDayYear":
                        return new Date(year(2), month(0), n(1));
                    case "MonthDay":
                        return new Date(curYr(), month(0), n(1));
                }
            }

            return null;
        })();
        
        return date;
    }

    // parseDate(dateStr: string) {
    //     if (!dateStr || !dateStr.trim()) return null;

    //     let quickValidate = () => {
    //         let d = new Date(dateStr);
    //         let m = moment(dateStr);

    //         return d.getTime() === d.getTime() && !m.isValid();
    //     }

    //     if (!quickValidate()) return null;

    //     let dateParts = dateStr.split("@");

    //     if (dateParts.length > 2) return null;

    //     let date = dateParts[0];
    //     let time = dateParts[1];

    //     let dateTime = new Date(date);
    //     let year = dateTime.getFullYear().toString();

    //     if (!date.includes(year)) {
    //         let currentYear = (new Date()).getFullYear();
    //         dateTime.setFullYear(currentYear);
    //     }

    //     if (time) {
    //         time = time.toUpperCase();

    //         if (time.includes(":")) {
    //             let timeParts = time.split(":");
                
    //             let hours = parseInt(timeParts[0]);
    //             let minutes = parseInt(timeParts[1]);

    //             if (isNaN(hours) || isNaN(minutes)) return null;

    //             if (time.includes("PM")) {
    //                 hours += 12;
    //             }

    //             dateTime.setHours(hours);
    //             dateTime.setMinutes(minutes);
    //         }
    //     }
        
    //     return dateTime;
    // }
}
