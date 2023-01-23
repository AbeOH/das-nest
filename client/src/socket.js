import { io } from "socket.io-client";
import {
    recentMessagesReceived,
    singleMessageReceived,
} from "../../redux/messageslicer";

export let socket;

export const initSocket = (store) => {
    console.log("initSocket");
    if (socket) {
        return;
    }

    socket = io.connect();

    // I receive a list of messages (prob. at the beginning)
    socket.on("chatMessages", (data) => {
        const action = recentMessagesReceived(data.messages);
        store.dispatch(action);
    });

    // I receive a single message when someone has sent it to the server
    socket.on("chatMessage", (data) => {
        const action = singleMessageReceived(data.message);
        store.dispatch(action);
    });
};
