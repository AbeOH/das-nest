import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../app/typeinterface";

export interface Message {
    id_sender: number;
    message: string;
    firstname_sender: string;
    lastname_sender: string;
    imgurl_sender: string;
    created_at: string;
}

export interface MessagesState {
    messages: Message[];
}

const initialState: MessagesState = {
    messages: [],
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        recentMessagesReceived: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        singleMessageReceived: (state, action: PayloadAction<Message>) => {
            state.messages.unshift(action.payload);
        },
    },
});

export const { recentMessagesReceived, singleMessageReceived } =
    messagesSlice.actions;

export default messagesSlice.reducer;
