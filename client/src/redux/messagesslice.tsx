import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../app/typeinterface";

export interface Message {
    bio: string;
    email: string;
    firstname: string;
    id: number;
    message: string;
    imageurl: string;
    lastname: string;
}

export interface MessagesState {
    value: Message[];
}

const initialState: MessagesState = {
    value: [],
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        recentMessagesReceived: (state, action: PayloadAction<Message[]>) => {
            console.log("action.payload 1: ", action.payload);
            console.log("state: ", state);
            state.value = action.payload;
        },
        singleMessageReceived: (state, action: PayloadAction<Message>) => {
            console.log("action.payload:2 ", action);
            state.value.unshift(action.payload);
        },
    },
});

export const { recentMessagesReceived, singleMessageReceived } =
    messagesSlice.actions;

export default messagesSlice.reducer;
