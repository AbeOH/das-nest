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

        // const event = {
        //     title: posts,
        //     start: { startEventDate },
        //     end: { endEventDate },
        //     // allDay: true,
        // };

        // calendarApi.addEvent(event);
    };

    const postEvent = (evt: React.SyntheticEvent) => {
        evt.preventDefault();

        fetch("/postEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                posts,
                startEventDate,
                endEventDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <textarea value={posts} onChange={handlePostChange} />
            <div>
                <input type="datetime-local" value={startEventDate} />
                <input type="datetime-local" value={endEventDate} />
            </div>
            {/* <button onClick={handleCreateEvent}>Create Event</button> */}
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
            />
        </div>
    );
}
