import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../app/typeinterface";

export interface Message {
    bio: string;
    email: string;
    firstname: string;
    id: number;
    imageurl: string;
    lastname: string;
}

export interface MessagesState {
    messages: Message[];
}

const initialState: Message[] = [];

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        recentMessagesReceived: (state, action: PayloadAction<Message[]>) => {
            state = action.payload;
        },
        singleMessageReceived: (state, action: PayloadAction<Message>) => {
            console.log("action.payload: ", action);
            state.unshift(action.payload);
        },
    },
});

export const { recentMessagesReceived, singleMessageReceived } =
    messagesSlice.actions;

export default messagesSlice.reducer;
