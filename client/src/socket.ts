import { io, Socket } from "socket.io-client";
import {
    recentMessagesReceived,
    singleMessageReceived,
} from "./redux/messagesslice";
import { Store } from "redux";

export let socket: Socket;

export const connect = (store: Store) => {
    console.log("initSocket");
    if (socket) {
        return;
    }

    socket = io();

    // I receive a list of messages (prob. at the beginning)
    socket.on("chatMessages", (data) => {
        console.log("data 1", data);
        const action = recentMessagesReceived(data); /// data.messages
        store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("chatMessage", (data) => {
        const action = singleMessageReceived(data); /// data.message
        console.log("actionnnnnn", data);
        store.dispatch(action);
    });
};
