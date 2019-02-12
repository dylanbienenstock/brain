import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { HttpService } from '../../services/http.service';
import { Responses } from '../../../../../shared/responses';
import { LogEntry } from '../../../../../server/src/intake-log/intake-log.types';
import { ICalenderEntry } from "../calender/calender.types";
import { StringUtilService } from '../../services/string-util.service';
import { Requests } from '../../../../../shared/requests';
import { NavbarExtensionClickEvent, NavbarService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-intake-log',
    templateUrl: './intake-log.component.html',
    styleUrls: ['./intake-log.component.scss']
})
export class IntakeLogComponent implements OnInit, OnDestroy {

    constructor(public screenService: ScreenService,
                private httpService: HttpService,
                private stringUtilService: StringUtilService,
                private navbarService: NavbarService) { }


    public calenderMode: "month" | "day" = "month";
    public logEntries: (LogEntry & ICalenderEntry)[] = [];
    public sortedEntries: (LogEntry & ICalenderEntry)[][][];
    public loading: boolean = true;

    public focusedInput: string;
    public curEntryId: string;
    
    public get curEntry(): LogEntry & ICalenderEntry {
        if (!this.curEntryId) return null;

        let index = this.logEntries
            .findIndex(le => le._id == this.curEntryId);

        if (index == -1) return null;

        return this.logEntries[index];
    }

    public set curEntry(val: LogEntry & ICalenderEntry) {
        if (!this.curEntryId) return;

        let index = this.logEntries
            .findIndex(le => le._id == this.curEntryId);

        if (index == -1) return;

        this.logEntries[index] = val;
    }

    private saveDelay: number = 1500;
    private defaultEntryName: string = "<New Entry>";
    private entryModifiedTimeouts: { [entryId: string]: any } = { };
    private extensionClickedSub: Subscription;
    
    private timeInputTouching: boolean = false;
    private timeInputTouchStartY: number;
    private timeInputOverrideStr: string;
    private timeInputOverrideDate: Date;
    
    ngOnInit() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();

        this.getLogEntries(year, month);

        this.extensionClickedSub = 
            this.navbarService.extensionClicked
                .subscribe((e: NavbarExtensionClickEvent) => {
                    this.onNavbarExtensionClicked(e);
                });
    }

    ngOnDestroy() {
        this.extensionClickedSub.unsubscribe();
    }

    setNavbarExtensions() {
        this.navbarService.setExtensions("calender", [
            this.calenderMode == 'day' && "Daily Log",
            this.curEntryId && "Entry"
        ]);
    }

    onNavbarExtensionClicked(e: NavbarExtensionClickEvent) {
        switch (e.index) {
            case -1:
            case 0:
                this.curEntryId = null;
                this.focusedInput = null;        
                break;
        }
        
        this.setNavbarExtensions();
    }

    handleError(text: string, error: any) {
        alert(`${text}
        
        ${JSON.stringify(error, null, 4)}`);
    }

    onCalenderMonthChanged() {
        this.loading = true;
    }

    onCalenderModeChanged(mode: "month" | "day") {
        this.calenderMode = mode;
        this.setNavbarExtensions();
    }

    onCalenderDeleteModeToggled(on: boolean) {
        if (!on) return;

        this.curEntryId = null;
    }

    createLogEntry(name: string, date: Date) {
        this.httpService.createLogEntry({ name, date })
            .subscribe((res: Responses.CreateLogEntry) => {
                if (res.error) {
                    this.handleError("Failed to create log entry.", res.error);
                    return;
                }

                this.mergeLogEntries([res.entry]);
            });
    }

    getLogEntries(year: number, month: number) {
        this.httpService.getLogEntries({ year, month })
            .subscribe((res: Responses.GetLogEntries) => {
                if (res.error) {
                    this.handleError("Failed to get log entries.", res.error);
                    return;
                }

                this.mergeLogEntries(res.entries);
            });
    }

    mergeLogEntries(entries: (LogEntry & ICalenderEntry)[]) {
        let logEntries = [ ...this.logEntries ];

        for (let entry of entries) {
            let index = logEntries
                .findIndex(le => le._id == entry._id);

            if (index != -1) {
                logEntries[index] = entry;
                continue;
            }

            entry.dotColor = entry.isFood
                ? "hsl(120, 100%, 30%)"
                : "hsl(0, 100%, 45%)";

            logEntries.push(entry);
        }

        this.logEntries = logEntries;
    }

    updateLogEntry(req: Requests.UpdateLogEntry) {
        this.httpService.updateLogEntry(req)
            .subscribe((res: Responses.UpdateLogEntry) => {
                if (res.error) {
                    this.handleError("Failed to update log entry.", res.error);
                    return;
                }
            });
    }

    deleteLogEntry(entryId: string) {
        this.httpService.deleteLogEntry({ entryId })
            .subscribe((res: Responses.DeleteLogEntry) => {
                if (res.error) {
                    this.handleError("Failed to delete log entry.", res.error);
                    return;
                }

                let index = this.logEntries
                    .findIndex(le => le._id == entryId);

                if (index == -1) return;

                this.logEntries.splice(index, 1);

                this.logEntries = [ ...this.logEntries ];
            });
    }

    onLogEntriesSorted(entries: (LogEntry & ICalenderEntry)[][][]) {
        this.sortedEntries = entries;
        this.loading = Object.values(entries).length == 0;
    }

    onLogEntryCreated(date: Date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDay();
        let hour = date.getHours();

        let d1 = [year, month, day].join("/");
        let d2 = hour;

        let name = this.defaultEntryName;

        if (this.sortedEntries && this.sortedEntries[d1] && this.sortedEntries[d1][d2]) {
            let otherNames = this.sortedEntries[d1][d2].map(le => le.name);
            name = this.stringUtilService.makeUnique(name, otherNames);
        }
        
        this.createLogEntry(name, date);
    }

    onLogEntryClicked(logEntry: LogEntry & ICalenderEntry) {
        this.curEntryId = logEntry._id;
        this.setNavbarExtensions();
    }

    onLogEntryDeleted(logEntry: LogEntry & ICalenderEntry) {
        this.deleteLogEntry(logEntry._id);
    }

    focusInput(name: string, el: HTMLElement) {
        this.focusedInput = name;

        setTimeout(() => {
            el.focus();
        });
    }

    onInputBlur() {
        this.focusedInput = null;
    }

    onToggleEntryProp(prop: string) {
        if (!this.curEntryId) return;

        this.curEntry[prop] = !this.curEntry[prop];

        this.curEntry = { ...this.curEntry } as LogEntry & ICalenderEntry;

        this.onEntryModified();
    }

    onEntryModified(timeModified: boolean = false) {
        console.log("asdasd", this.curEntry)

        let entryId = this.curEntryId;
        let entry = this.curEntry;
        let shouldRefreshCalender = false;

        let dotColor = entry.isFood
            ? "hsl(120, 100%, 30%)"
            : "hsl(0, 100%, 45%)";

        if (entry.dotColor != dotColor) {
            entry.dotColor = dotColor;
            shouldRefreshCalender = true;
        }

        if (timeModified) {
            let time = this.parseTime(entry.timeStr);

            if (time) {
                entry.date.setHours(time.hr);
                entry.date.setMinutes(time.m);
                entry.date = entry.date;
                
                shouldRefreshCalender = true;
            }
        }

        if (shouldRefreshCalender) {
            this.logEntries = [ ...this.logEntries ];
        }

        clearTimeout(this.entryModifiedTimeouts[entryId]);

        this.entryModifiedTimeouts[entryId] = 
            setTimeout(() => {
                this.updateLogEntry({
                    entryId,
                    name: entry.name,
                    description: entry.description,
                    isFood: entry.isFood,
                    notable: entry.notable,
                    amount: entry.amount,
                    date: entry.date
                });
            }, this.saveDelay);
    }

    timeValid(timeStr: string): boolean {
        if (!timeStr || !timeStr.trim()) return true;
        return !!this.parseTime(timeStr);
    }

    parseTime(timeStr: string): { hr: number, m: number } {
        if (!timeStr) return null;

        timeStr = timeStr.trim().toUpperCase();

        let regex = /^(\d|(?:1[0-2])):([0-5][0-9])\s((?:AM)|(?:PM))$/;
        let s = timeStr.match(regex);

        if (!s) return null;

        s.shift();

        let n = (i) => {
            return parseInt(s[i]);
        }
        
        let hour = (() => {
            let [tw, pm] = [
                s[0] == "12", 
                s[2] == "PM"
            ];
    
            if (tw && !pm) return n(0) - 12;
            if (!tw && pm) return n(0) + 12;

            return n(0);
        })();

        return { hr: hour, m: n(1) };
    }

    onTimeInputTouchStart(e: TouchEvent) {
        let touch = e.targetTouches.item(0);

        if (!touch) return;

        this.timeInputTouching = true;
        this.timeInputTouchStartY = touch.screenY;
    }

    onTimeInputTouchMove(e: TouchEvent) {
        if (this.timeInputTouchStartY == null) return;

        let touch = e.targetTouches.item(0);

        if (!touch) return;

        let year = this.curEntry.date.getFullYear();
        let month = this.curEntry.date.getMonth();
        let day = this.curEntry.date.getDate()
        let time = this.curEntry.date.getTime();

        let minTime = new Date(year, month, day, 0, 0, 0, 0).getTime();
        let maxTime = new Date(year, month, day + 1, 0, -1).getTime();

        let diff = this.timeInputTouchStartY - touch.screenY;
        let diffNorm = diff / this.screenService.height;

        let maxChange = 1000 * 60 * 30; // If touch moves entire height of screen
        let change = Math.floor(diffNorm * maxChange);
        
        let newTime = Math.min(Math.max(minTime, time + change), maxTime);
        let newDate = new Date(newTime);
        
        let newHour = newDate.getHours();
        let newMinutes = newDate.getMinutes();

        let newMinutesStr = (newMinutes < 10 ? "0" : "") + newMinutes;
        let newPeriod = "AM";

        if (newHour > 11) {
            newHour -= 12;
            newPeriod = "PM";
        }

        if (newHour == 0) {
            newHour = 12;
        }
        
        let newTimeStr = `${newHour}:${newMinutesStr} ${newPeriod}`;

        this.timeInputOverrideStr = newTimeStr;
        this.timeInputOverrideDate = newDate;
    }

    resetTimeInputTouchState() {
        this.timeInputTouching = false;
        this.timeInputTouchStartY = null;
        this.timeInputOverrideStr = null;
        this.timeInputOverrideDate = null;
    }
    
    onTimeInputTouchEnd(e: TouchEvent) {
        if (!this.timeInputTouching || e.targetTouches.length > 0) return;
        
        this.curEntry.timeStr = this.timeInputOverrideStr;
        this.curEntry.date = this.timeInputOverrideDate;

        this.resetTimeInputTouchState();
        this.onEntryModified(true);
    }
}
