import { configureStore } from "@reduxjs/toolkit";
import { friendslistslice } from "./friendslistslice";
// import { userIdSlice } from "./userIdslice";

export const store = configureStore({
    reducer: {
        friendslist: friendslistslice.reducer,
        // user: userIdSlice.reducer,
    },
});

export default store;

/// Exporting the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
