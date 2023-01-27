// import FullCalendar from "@fullcalendar/react";
import { useState, useEffect } from "react";
import Calendar from "../calendar/calendar";
import {
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
    formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";

// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import { ca } from "@fullcalendar/core/internal-common";

// import { INITIAL_EVENTS, createEventId } from ".calendar/event-utils";

interface PostProps {
    post: string;
}

export default function Post() {
    const [posts, setPosts] = useState<string>("");
    // const [eventDate, setEventDate] = useState<Date>(new Date());
    const [startEventDate, setStartEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );
    const [endEventDate, setEndEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );

    // const [posts, setPosts] = useState<PostProps[]>([]);
    // const calendarRef = React.createRef<FullCalendar>();
    // const calendarApi = new FullCalendar.Calendar(calendarContainer, {
    //     plugins: [dayGridPlugin],
    //     events: [],
    // });

    const handlePostChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPosts(evt.target.value);
    };

    const handleCreateEvent = (selectInfo: DateSelectArg) => {
        let calendarApi = selectInfo.view.calendar;
        calendarApi.unselect(); // clear date selection

        const event = {
            title: posts,
            start: new Date(),
            end: new Date(),
            // allDay: true,
        };

        calendarApi.addEvent(event);
    };

    return (
        <div>
            <textarea value={posts} onChange={handlePostChange} />
            <button onClick={handleCreateEvent}>Create Event</button>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
            <div>
                <input type="datetime-local" value={startEventDate} />
                <input type="datetime-local" value={endEventDate} />
            </div>
        </div>
    );
}
