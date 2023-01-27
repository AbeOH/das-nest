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

/// Integration of events creation into dynamically
import { EventInput } from "@fullcalendar/core";

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

    ////// Create dynamic react variable that takkes the input from my db fetch
    let eventGuid = 0;
    let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
    let endtodayStr = new Date("2023-01-28").toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

    const createEventId = () => {
        return String(eventGuid++);
    };

    const INITIAL_EVENTS: EventInput[] = [
        {
            id: createEventId(),
            title: "Test Event",
            start: todayStr,
            end: endtodayStr,
        },
    ];
    ////
    // const handlePostChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setPosts(evt.target.value);
    // };

    // const handleCreateEvent = (selectInfo: DateSelectArg) => {
    //     let calendarApi = selectInfo.view.calendar;
    //     calendarApi.unselect(); // clear date selection

    //     // const event = {
    //     //     title: posts,
    //     //     start: { startEventDate },
    //     //     end: { endEventDate },
    //     //     // allDay: true,
    //     // };

    //     // calendarApi.addEvent(event);
    // };
    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const property = evt.target.name;
        const value = evt.target.value;
        setPosts(value);
        setStartEventDate(value);
        setEndEventDate(value);
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
                /// Save data here dynamically in object
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <form onSubmit={postEvent}>
                <label htmlFor="posts">Event</label>
                <input
                    type="text"
                    name="posts"
                    value={posts}
                    onChange={handleInputChange}
                />
                <label htmlFor="startEventDate">Start</label>
                <input
                    type="datetime-local"
                    name="startEventDate"
                    value={startEventDate}
                    onChange={handleInputChange}
                />
                <label htmlFor="endEventDate">End</label>
                <input
                    type="datetime-local"
                    name="endEventDate"
                    value={endEventDate}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Event</button> <br />
            </form>
        </div>
    );
}

{
    /* <div> value={posts}
                <input type="datetime-local" value={startEventDate} />
                <input type="datetime-local" value={endEventDate} />
            </div> */
}
{
    /* <button onClick={handleCreateEvent}>Create Event</button> */
}
//     <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         // weekends={weekendsVisible}
//         initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//         // select={handleDateSelect}
//         eventContent={renderEventContent} // custom render function
//         // eventClick={handleEventClick}
//     />
// </div>
// );
// }

function renderSidebarEvent(event: EventApi) {
    return (
        <li key={event.id}>
            <b>
                {formatDate(event.start!, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </b>
            <i>{event.title}</i>
        </li>
    );
}

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    );
}
