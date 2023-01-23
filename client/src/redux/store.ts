import { configureStore } from "@reduxjs/toolkit";
import { friendslistslice } from "./friendslistslice";
import { messagesSlice } from "./messagesslice";

export const store = configureStore({
    reducer: {
        friendslist: friendslistslice.reducer,
        messages: messagesSlice.reducer,
    },
});

export default store;

/// Exporting the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
