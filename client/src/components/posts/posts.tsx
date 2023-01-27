import FullCalendar from "@fullcalendar/react";
import { useState, useEffect } from "react";
import Calendar from "../calendar/calendar";
import {
    EventApi,
    DateSelectArg,
    EventClickArg,
    EventContentArg,
    formatDate,
} from "@fullcalendar/react";

// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ca } from "@fullcalendar/core/internal-common";

// import { INITIAL_EVENTS, createEventId } from ".calendar/event-utils";

interface PostProps {
    post: string;
}

export default function Post() {
    // const [posts, setPosts] = useState<PostProps[]>([]);
    const [posts, setPosts] = useState<string>("");
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
        </div>
    );
}
