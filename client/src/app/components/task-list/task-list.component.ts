import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskList } from '../../../../../server/src/task-list/task-list.types';
import { HttpService } from '../../services/http.service';
import { Responses } from '../../../../../shared/responses';
import { Requests } from '../../../../../shared/requests';
import { ScreenService } from '../../services/screen.service';
import { NavbarService, NavbarExtensionClickEvent } from '../../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    constructor(private httpService: HttpService,
                public screenService: ScreenService,
                public navbarService: NavbarService) { }
    
    public taskLists: TaskList[] = [];
    public curListIndex: number;

    public listSelected: boolean = false;
    public taskSelected: boolean = false;
    public selectedListDetail: string = "";

    public defaultTaskListName: string = "<New Task List>";
    public listSymbol = "☰";
    
    private taskListDetailsModifiedTimeout;
    private navbarExtensionClickedSub: Subscription;
    private navbarExtensionOwner = "task-list";

    ngOnInit() {
        this.getTaskLists();

        this.navbarExtensionClickedSub =
            this.navbarService.extensionClicked
                .subscribe((e: NavbarExtensionClickEvent) => {
                    this.onExtensionClicked(e);
                });
    }

    setNavbarExtensions() {
        let curList = this.taskLists[this.curListIndex];
        let listName = curList && curList.name;

        this.navbarService
            .setExtensions(this.navbarExtensionOwner, [
                this.listSelected && (listName || "<Untitled>")
            ]);
    }

    onExtensionClicked(e: NavbarExtensionClickEvent) {
        if (e.owner != this.navbarExtensionOwner) return;

        switch (e.index) {
            case -1:
                this.curListIndex = null;
                this.listSelected = false;
                this.taskSelected = false;
                break;
        }

        this.setNavbarExtensions();
    }

    getTaskLists() {
        this.httpService.getTaskLists()
            .subscribe((res: Responses.GetTaskLists) => {
                if (!res.success) {
                    alert("Failed to fetch task lists.");
                    return;
                }

                this.taskLists = res.taskLists;
                console.log(res.taskLists);
            });
    }

    updateTaskList(req: Requests.UpdateTaskList) {
        this.httpService.updateTaskList(req)
            .subscribe((res: Responses.UpdateTaskList) => {
                if (!res.success) alert("Failed to update task list.");
            });
    }

    deleteTaskList(index: number) {
        this.httpService.deleteTaskList({
            _id: this.taskLists[this.curListIndex]._id
        })
        .subscribe((res: Responses.UpdateTaskList) => {
            if (!res.success) {
                alert("Failed to delete task list.");
                return;
            }

            this.curListIndex = null;
            this.listSelected = false;

            this.taskLists.splice(index, 1);
            this.setNavbarExtensions();
        });
    }

    onCreateTaskList() {
        if (!this.taskLists) return;

        let name = "New task list";
        let suffix = "";

        for (let taskList of this.taskLists) {
            if (taskList.name.startsWith(name)) {
                if (!suffix) suffix = " (2)";

                if (taskList.name.endsWith(suffix)) {
                    let num = suffix.substr(2, suffix.length - 1);
                    suffix = ` (${ parseInt(num) + 1 })`;
                }
            }
        }

        this.httpService.createTaskList({ name: name + suffix })
            .subscribe((response: Responses.CreateTaskList) => {
                console.log("[createTaskList]", response);

                if (!response.success) {
                    alert(`Failed to create task list.`);

                    return;
                }

                this.taskLists.push(response.taskList);
                this.onSelectTaskList(this.taskLists.length - 1);
            });
    }

    onSelectTaskList(index: number) {
        this.curListIndex = index;
        this.listSelected = true;

        this.setNavbarExtensions();
    }

    onDeleteTaskList() {
        if (!this.listSelected) return;

        this.deleteTaskList(this.curListIndex);
        this.setNavbarExtensions();
    }

    onTaskListDetailsFocused(detail: string, el: HTMLElement) {
        this.selectedListDetail = detail;

        setTimeout(() => {
            el.focus();
        });
    }
    
    onTaskListDetailsBlur() {
        this.selectedListDetail = "";
    }

    onTaskListDetailsModified() {
        this.setNavbarExtensions();

        clearTimeout(this.taskListDetailsModifiedTimeout);

        let taskList = { ...this.taskLists[this.curListIndex] };

        if (!taskList.name.trim()) {
            taskList.name = "<Untitled>";
        }

        console.log(taskList.description);

        this.taskListDetailsModifiedTimeout = 
            setTimeout(() => {
                this.updateTaskList({
                    _id: taskList._id,
                    name: taskList.name,
                    description: taskList.description
                });
            }, 300);
    }
}
