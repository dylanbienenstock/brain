import { Injectable } from '@angular/core';
import { TaskList } from '../../../../server/src/task-list/task-list.types';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    public taskLists: TaskList[] = [];

}
