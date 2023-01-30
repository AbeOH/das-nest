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
    const [eventName, setEventName] = useState<string>("");
    // const [eventDate, setEventDate] = useState<Date>(new Date());
    const [startEventDate, setStartEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );
    const [endEventDate, setEndEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );
    const [fetchedEvents, setFetchedEvents] = useState<EventInput[]>([]);

    const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const property = evt.target.name;
        const value = evt.target.value;
        if (property === "eventName") {
            setEventName(value);
        } else if (property === "startEventDate") {
            setStartEventDate(value);
        } else if (property === "endEventDate") {
            setEndEventDate(value);
        }
    };

    const postEvent = (evt: React.SyntheticEvent) => {
        evt.preventDefault();

        fetch("/postEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventName,
                startEventDate,
                endEventDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // setFetchedEvents((prevEvents) => [
                //     ...prevEvents,
                //     {
                //         id: createEventId(),
                //         title: data.eventName,
                //         start: data.startEventDate,
                //         end: data.endEventDate,
                //     },
                // ]);
                // setInitialEvents([
                //     ...initialEvents,
                //     {
                //         id: createEventId(),
                //         title: data.eventName,
                //         start: data.startEventDate,
                //         end: data.endEventDate,
                //     },
                // ]);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch("/getEvents")
            .then((res) => res.json())
            .then((data) => {
                setFetchedEvents(
                    data.map((event: any) => {
                        return {
                            id: event.id,
                            title: event.eventName,
                            start: event.startEventDate,
                            end: event.endEventDate,
                        };
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, [fetchedEvents, initialEvents]);

    ////// Create dynamic react variable that takkes the input from my db fetch
    let eventGuid = 0;
    let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
    let endtodayStr = new Date("2023-01-28").toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

    /// Might not need this function if I set the id to the user_id from the db
    const createEventId = () => {
        return String(eventGuid++);
    };

    // const INITIAL_EVENTS: EventInput[] = [
    //     ...fetchedEvents,
    //     {
    //         id: createEventId(),
    //         title: "Test Event",
    //         start: todayStr,
    //         end: endtodayStr,
    //     },
    // ];

    return (
        <div>
            <form onSubmit={postEvent}>
                <label htmlFor="posts">Event</label>
                <input
                    type="text"
                    name="eventName"
                    value={eventName}
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
            <FullCalendar
                plugins={[dayGridPlugin]} //
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // weekends={weekendsVisible}
                initialEvents={fetchedEvents} // alternatively, use the `events` setting to fetch from a feed
                // select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                // eventClick={handleEventClick}
            />
        </div>
    );
}

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
