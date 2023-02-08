import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, SyntheticEvent } from "react";
import { connect, socket } from "../../socket";

// import { io, Socket } from "socket.io-client";
// import { recentMessagesReceived } from "../../redux/messagesSlice";
// import { Store } from "redux";
// import { Action } from "../../app/typeinterface";
import { RootState } from "../../redux/store";

export default function Chat() {
    // const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => {
        console.log("state", state);
        return state.messages;
    });
    console.log("messages", messages);
    const [messageState, setMessageState] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const toggleChat = () => setIsOpen(!isOpen);

    const changeMessage = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageState(evt.target.value);
    };

    const submitMessage = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        console.log("messageState: ", messageState);
        socket.emit("sendMessage", { message: messageState });
        setMessageState("");
    };

    const onChatKeyDown = (evt: React.KeyboardEvent) => {
        if (evt.code === "Enter") {
            evt.preventDefault();
            socket.emit("sendMessage", messageState);
            console.log("messageState: ", messageState);
            setMessageState("");
        }
    };

    // const [connectChat, setConnectChat] = useState<Boolean>(false);
    // const toggleChat = () => {
    //     // setConnectChat(!connectChat);
    // };

    // const onChatKeyDown = (evt: React.SyntheticEvent) => {
    //     if (evt.code === "Enter") {
    //         evt.preventDefault();
    //         // no need to `fetch`! Just emit via the socket.
    //         socket.emit("sendMessage", { message: evt.currentTarget.value });
    //         // clear the input field!
    //     }
    // };

    // ...

    return (
        <section>
            <button className="chat-Button" onClick={toggleChat}>
                Open/Close Chat
            </button>
            <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
                <div className="new-message">
                    <textarea
                        name="message"
                        placeholder="Your message here"
                        onChange={(evt) => changeMessage(evt)}
                        onKeyDown={(evt) => onChatKeyDown(evt)}
                        value={messageState}
                    ></textarea>
                </div>
                <div className="message-container">
                    {messages.value?.length > 0 &&
                        messages.value.map((message) => (
                            <div key={message.id} className="message">
                                {message.message}
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}

// useEffect(() => {
// const socket = connect();

//     socket.on("chatMessages", (data) => {
//         console.log("data: ", data);
//         const action = recentMessagesReceived(data.messages);
//         store.dispatch(action);
//     });

//     // I receive a single message when someone has sent it to the server
//     socket.on("chatMessage", (data) => {
//         const action = singleMessageReceived(data.message);
//         store.dispatch(action);
//     });
// }, []);
// }, [dispatch]);
