import { EventInput } from "@fullcalendar/core";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
let newtodayStr = new Date("2023-01-28").toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: "All-day event",
        start: todayStr,
    },
    {
        id: createEventId(),
        title: "Timed event",
        start: todayStr + "T12:00:00",
    },
    {
        id: createEventId(),
        title: "Soccer Practice",
        start: newtodayStr + "T17:00:00",
    },
];

export function createEventId() {
    return String(eventGuid++);
}
