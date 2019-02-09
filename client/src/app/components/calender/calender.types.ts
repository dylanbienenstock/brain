export interface Day {
    number: number;
    month: "last" | "current" | "next";
    isToday: boolean;

    hovered?: boolean;
    scrollable?: boolean;
    scrollAmount?: number;
    scrollTime?: number;
}

export interface Hour {
    number: number;
}

export interface ICalenderEntry {
    _id: string;
    name: string;
    date: Date;

    timeStr?: string;
    dotColor?: string;
}