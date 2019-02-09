import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input, OnDestroy, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Day, Hour, ICalenderEntry } from './calender.types';
import { ScreenService } from '../../services/screen.service';
import { NavbarService, NavbarExtensionClickEvent } from '../../services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html',
    styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit, OnDestroy {

    constructor(public screenService: ScreenService,
                public changeDetectorRef: ChangeDetectorRef,
                public navbarService: NavbarService) { }

    @Input() set entries(val: ICalenderEntry[]) { this.sortEntries(val); }
    @Input() focusId: string;
    @Input() extraFields: string[];
    @Input() extraFieldDelims: string[];

    @Output() monthChanged = new EventEmitter<Date>();
    @Output() viewModeChanged = new EventEmitter<"month" | "day">();
    @Output() deleteModeToggled = new EventEmitter<boolean>();
    @Output() entryCreated = new EventEmitter<Date>();
    @Output() entriesSorted = new EventEmitter<ICalenderEntry[][][]>();
    @Output() entryClicked = new EventEmitter<ICalenderEntry>();
    @Output() entryDeleted = new EventEmitter<ICalenderEntry>();
    
    @ViewChild("dayContainer") dayRef: ElementRef;
    public get dayContainer(): HTMLElement {
        return this.dayRef.nativeElement;
    }

    @ViewChildren("hourContainer") hourRefs: QueryList<ElementRef>;
    public get curHourContainer(): HTMLElement {
        let ref = this.hourRefs
            .find(h => h.nativeElement && h.nativeElement.id == `hour-${this.curHour}`);

        if (!ref) return null;

        return ref.nativeElement;
    }

    public months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    public weekdays = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday",
        "Friday", "Saturday"
    ];

    public sortedEntries: ICalenderEntry[][][] = []
    public deletingEntries: boolean = false;

    public viewMode: "month" | "day" = "month";
    public viewDateStr: string = "";

    public viewYear: number;
    public viewMonth: number;
    public viewDay: number;
    
    public curWeekday: number;
    public curHour: number;
    public viewingToday: boolean;

    public viewYearMonth: Date = new Date();
    public viewMonthDays: Day[] = [];
    public viewDayHours: Hour[] = [];

    public viewMonthOverflow: boolean = false;

    private now: Date = new Date();
    private extensionClickedSub: Subscription;

    ngOnInit() {
        this.buildMonth();

        this.extensionClickedSub = 
            this.navbarService.extensionClicked
                .subscribe((e: NavbarExtensionClickEvent) => {
                    this.onNavbarExtensionClicked(e);
                });
    }

    ngOnDestroy() {
        this.extensionClickedSub.unsubscribe();
    }

    onNavbarExtensionClicked(e: NavbarExtensionClickEvent) {
        switch (e.index) {
            case -1:
                this.exitDayViewMode(); break;
        }
    }

    toEntryKey(date: Date, day?: number) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let _day = day || date.getDate();

        return [year, month, _day].join("/");
    }

    sortEntries(entries: ICalenderEntry[]) {
        let sortedEntries: ICalenderEntry[][][] = [];

        if (entries.length == 0) {
            this.deletingEntries = false;
            this.deleteModeToggled.emit(false);
        }

        for (let entry of entries) {
            let d1 = this.toEntryKey(entry.date);
            let d2 = entry.date.getHours();

            if (!sortedEntries[d1]) sortedEntries[d1] = [];
            if (!sortedEntries[d1][d2]) sortedEntries[d1][d2] = [];

            let hour = d2 <= 12 ? d2 : d2 - 12;
            hour = hour != 0 ? hour : 12;

            let minutes = entry.date.getMinutes().toString();
            minutes = minutes.length == 2 ? minutes : "0" + minutes;

            entry.timeStr = `${ hour }:${ minutes } ${ d2 <= 11 ? "AM" : "PM" }`

            sortedEntries[d1][d2].push(entry);
        }
        
        for (let d1 in sortedEntries) {
            for (let d2 in sortedEntries[d1]) {
                sortedEntries[d1][d2].sort((a, b) => {
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;

                    return 0;
                });
            }
        }

        this.sortedEntries = sortedEntries;
        this.entriesSorted.emit(sortedEntries);
    }

    getSortedEntries(day: number, hour?: number) {
        if (!this.sortedEntries) return [];

        let d1 = this.toEntryKey(this.viewYearMonth, day);
        let d2 = hour;

        if (!this.sortedEntries[d1]) return [];

        // Return all entries for the day if hour is not specified
        if (d2 == undefined) {
            return this.sortedEntries[d1]
                .reduce((accum, val) => [ ...accum, ...val ]);
        } 

        if (!this.sortedEntries[d1][d2]) return [];

        return this.sortedEntries[d1][d2];
    }

    onChangeMonth(add: number) {
        let curMonth = this.viewYearMonth.getMonth();

        this.viewYearMonth.setMonth(curMonth + add);

        this.buildMonth();
        this.monthChanged.emit(this.viewYearMonth);
    }

    onMouseEnterDayCell(index: number, dayCell: HTMLElement, dayNumber: HTMLElement, content: HTMLElement) {
        if (this.screenService.mobile) return;
        if (!dayCell || !content) return;

        let day = this.viewMonthDays[index];
        let cellHeight = dayCell.clientHeight;
        let numberHeight = dayNumber.clientHeight;
        let contentHeight = content.clientHeight;

        day.scrollAmount = contentHeight + numberHeight + 16 - cellHeight;
        day.scrollable = day.scrollAmount > 0;
        day.scrollTime = Math.floor(day.scrollAmount * 12);
        day.hovered = true;
    }

    onMouseLeaveDayCell(index: number) {
        let day = this.viewMonthDays[index];

        day.scrollTime = Math.floor(day.scrollAmount * 6);
        day.hovered = false;
    }

    onClickDayCell(day: Day) {
        day.hovered = false;

        let year = this.viewYearMonth.getFullYear();
        let month = this.viewYearMonth.getMonth();
        let weekday = this.getWeekDay(year, month, day.number);

        this.viewDateStr = `${ this.weekdays[weekday] }, ${ this.months[month] } ${ day.number }, ${ year }`;
        this.viewDay = day.number;
        this.viewMode = "day";
        this.viewingToday = day.isToday;

        this.buildDay();
        this.viewModeChanged.emit(this.viewMode);
    }

    exitDayViewMode() {
        this.viewMode = "month";
        this.viewDay = null;
        this.viewModeChanged.emit(this.viewMode);

        this.deletingEntries = false;
        this.deleteModeToggled.emit(false);
    }

    onToggleDeleteMode() {
        this.deletingEntries = !this.deletingEntries;
        this.deleteModeToggled.emit(this.deletingEntries);
    }

    onCreateEntry() {
        this.entryCreated.emit(new Date());
    }

    onEntryClicked(entry: ICalenderEntry) {
        this.entryClicked.emit(entry);
    }

    onEntryDeleted(entry: ICalenderEntry) {
        this.entryDeleted.emit(entry);
    }

    buildDay() {
        let viewDayHours = [];
        this.now = new Date();
        this.curHour = this.now.getHours();

        for (let i = 0; i < 24; i++) {
            viewDayHours.push({
                number: 23 - i
            });
        }

        this.viewDayHours = viewDayHours;

        if (this.viewingToday) {
            setTimeout(() => {
                let cellSize = this.screenService.mobile ? 56 : 72;
                this.dayContainer.scrollTop = this.curHourContainer.offsetTop - cellSize - 1;
            });
        }
    }

    buildMonth() {
        this.viewMonthDays = [];
        this.now = new Date();

        let year = this.viewYearMonth.getFullYear();
        let month = this.viewYearMonth.getMonth();
        let day = this.viewYearMonth.getDate();

        let daysOfThisMonth = this.getDaysInMonth(year, month);
        let daysOfLastMonth = this.getDaysInMonth(year, month - 1);
        let weekdayOfFirstDayOfThisMonth = this.getWeekDay(year, month, 1);

        let viewingCurrentMonth = 
            month == this.now.getMonth() &&
            year == this.now.getFullYear();

        if (viewingCurrentMonth) {
            this.curWeekday = this.viewYearMonth.getDay();
        } else {
            this.curWeekday = null;
        }

        this.viewDateStr = `${ this.months[month] }, ${ year }`;
        this.viewYear = year;
        this.viewMonth = month;

        for (let i = 0; i < weekdayOfFirstDayOfThisMonth; i++) {
            let dayNumber = daysOfLastMonth - weekdayOfFirstDayOfThisMonth + i + 1;

            this.viewMonthDays.push({
                number: dayNumber,
                month: "last",
                isToday: false
            });
        }

        for (let i = 0; i < daysOfThisMonth; i++) {
            let isToday = viewingCurrentMonth && (i + 1 == day);

            this.viewMonthDays.push({
                number: i + 1,
                month: "current",
                isToday
            });
        }

        let totalCells = 7 * 5;
        this.viewMonthOverflow = this.viewMonthDays.length > totalCells;

        if (this.viewMonthOverflow) totalCells = 7 * 6;

        let remainingCells = totalCells - this.viewMonthDays.length;

        for (let i = 0; i < remainingCells; i++) {
            this.viewMonthDays.push({
                number: i + 1,
                month: "next",
                isToday: false
            });
        }
    }

    getWeekDay(year: number, month: number, day: number) {
        return new Date(year, month, day).getDay();
    }

    getDaysInMonth(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }
}
