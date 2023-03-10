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

import { Modal, Button } from "react-bootstrap";

// import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

/// Integration of events creation into dynamically
import { EventInput } from "@fullcalendar/core";

// Import Chat
import Chat from "../chat/chat";

import { useParams, useNavigate } from "react-router-dom";

interface Event {
    id: number;
    content: string;
    start_event_date: string;
    end_event_date: string;
    event?: Event;
    show: boolean;
    handleClose: () => void;
}

export default function Post() {
    const params = useParams();
    // console.log("params", params);

    const id = +(params.groupId ?? 0);

    // console.log("Is the id here? ", id);

    const [eventName, setEventName] = useState<string>("");
    // const [eventDate, setEventDate] = useState<Date>(new Date());
    const [startEventDate, setStartEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );
    const [endEventDate, setEndEventDate] = useState<string>(
        new Date().toISOString().replace(/T.*$/, "")
    );
    const [fetchedEvents, setFetchedEvents] = useState<EventInput[]>([]);

    const [showForm, setShowForm] = useState(false);

    const [showModal, setShowModal] = useState(false);

    // const [event, setEvent] = useState<Event | undefined>(undefined);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    // const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);

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
        console.log("right id?", id);
        console.log("id before sending to the server: ", id);
        fetch("/postEvents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                eventName,
                startEventDate,
                endEventDate,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFetchedEvents([
                    ...fetchedEvents,
                    {
                        id: data.id,
                        title: data.content,
                        start: data.start_event_date,
                        end: data.end_event_date,
                    },
                ]);

                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetch(`/getEvents/${id}`) /// "/getEvents"
            /// Dynamic events fetch with group id
            .then((res) => res.json())
            .then((data) => {
                console.log("data correct?: ", data);
                setFetchedEvents(
                    data.map((evt: Event) => {
                        const start = new Date(evt.start_event_date).toString();
                        const end = new Date(evt.end_event_date).toString();

                        return {
                            id: evt.id,
                            title: evt.content,
                            start: evt.start_event_date,
                            end: evt.end_event_date,
                        };
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleClose = () => setShowModal(false);
    const handleShow = (event: EventClickArg) => {
        setEventName(event.event.title);
        setStartEventDate(event.event.startStr);
        setEndEventDate(event.event.endStr || "");
        setShowModal(true);
    };

    // const eventClick = (arg: EventClickArg) => {
    //     handleShow(arg);
    // };

    const eventClick = (arg: EventClickArg) => {
        let message = "Event: " + eventName + "\n" + "Start: " + startEventDate;
        if (endEventDate) {
            message += "\nEnd: " + endEventDate;
        }
        if (eventName) {
            message += "\nDescription: " + eventName;
        }
        alert(message);
    };

    return (
        <div>
            <div className="container">
                <Chat />
                <button className="create-event" onClick={toggleForm}>
                    Create Event
                </button>
                {showForm && (
                    <form onSubmit={postEvent}>
                        <label htmlFor="posts">Event</label>
                        <input
                            type="text"
                            name="eventName"
                            value={eventName}
                            onChange={handleInputChange}
                        />
                        <div className="date-inputs">
                            <div>
                                <label htmlFor="startEventDate">Start</label>
                                <input
                                    type="datetime-local"
                                    name="startEventDate"
                                    value={startEventDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="endEventDate">End</label>
                                <input
                                    type="datetime-local"
                                    name="endEventDate"
                                    value={endEventDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button type="submit">Create Event</button>
                    </form>
                )}
            </div>

            <FullCalendar
                plugins={[dayGridPlugin]}
                // initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={fetchedEvents}
                eventContent={renderEventContent}
                eventClick={eventClick}
            />
            {/* <EventModal
                show={showModal}
                handleClose={handleClose}
                eventName={eventName}
                startEventDate={startEventDate}
                endEventDate={endEventDate}
                event={event}
            /> */}
        </div>
    );
}

// interface EventModalProps {
//     event?: Event;
//     show: boolean;
//     handleClose: () => void;
//     eventName: string;
//     startEventDate: string;
//     endEventDate: string;
// }

// const EventModal: React.FC<Event> = ({ show, handleClose, event }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{event.content}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 Start: {event.start_event_date}
//                 <br />
//                 End: {event.end_event_date}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// const EventModal: React.FC<EventModalProps> = ({
//     show,
//     handleClose,
//     eventName,
//     startEventDate,
//     endEventDate,
// }) => {
//     let message = "Event: " + eventName + "\n" + "Start: " + startEventDate;
//     if (endEventDate) {
//         message += "\nEnd: " + endEventDate;
//     }
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{eventName}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>{message}</Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// function renderSidebarEvent(event: EventApi) {
//     return (
//         <li key={event.id}>
//             <b>
//                 {formatDate(event.start!, {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                 })}
//             </b>
//             <i>{event.title}</i>
//         </li>
//     );
// }

function renderEventContent(eventContent: EventContentArg) {
    return (
        <>
            <b>{eventContent.timeText}</b>
            <i>{eventContent.event.title}</i>
        </>
    );
}

// useEffect(() => {
//     setInitialEvents(fetchedEvents);
//     console.log("fetchedEvents: ", fetchedEvents);
//     console.log("initialEvents: ", initialEvents);
// }, [fetchedEvents]);

////// Create dynamic react variable that takkes the input from my db fetch
// let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
// let endtodayStr = new Date("2023-01-28").toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

/// Might not need this function if I set the id to the user_id from the db
// const createEventId = () => {
//     return String(eventGuid++);
// };

// const INITIAL_EVENTS: EventInput[] = [
//     ...fetchedEvents,
//     {
//         id: createEventId(),
//         title: "Test Event",
//         start: todayStr,
//         end: endtodayStr,
//     },
// ];

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

// <div>
//     <form onSubmit={postEvent}>
//         <label htmlFor="posts">Event</label>
//         <input
//             type="text"
//             name="eventName"
//             value={eventName}
//             onChange={handleInputChange}
//         />
//         <div style={{ display: "flex" }}>
//             <div style={{ marginRight: 8 }}>
//                 <label htmlFor="startEventDate">Start</label>
//                 <input
//                     type="datetime-local"
//                     name="startEventDate"
//                     value={startEventDate}
//                     onChange={handleInputChange}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="endEventDate">End</label>
//                 <input
//                     type="datetime-local"
//                     name="endEventDate"
//                     value={endEventDate}
//                     onChange={handleInputChange}
//                 />
//             </div>
//         </div>
//         <button type="submit">Create Event</button> <br />
//     </form>

//     <Chat />
//     {/* {renderSidebarEvent()} */}
//     <FullCalendar
//         plugins={[dayGridPlugin]} //
//         editable={true}
//         selectable={true}
//         selectMirror={true}
//         dayMaxEvents={true}
//         // weekends={weekendsVisible}
//         // initialEvents={initialEvents}
//         events={fetchedEvents} // alternatively, use the `events` setting to fetch from a feed
//         // select={handleDateSelect}
//         eventContent={renderEventContent} // custom render function
//         // eventClick={handleEventClick}
//     />
// </div>
