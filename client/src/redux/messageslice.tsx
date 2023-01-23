import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: [],
    reducers: {
        recentMessagesReceived: (state, action) => {
            state = action.payload.messages;
        },
        singleMessageReceived: (state, action) => {
            state.push(action.payload.message);
        },
    },
});

export const { recentMessagesReceived, singleMessageReceived } =
    messagesSlice.actions;

export default messagesSlice.reducer;
