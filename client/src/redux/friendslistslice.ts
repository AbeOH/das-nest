import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../app/typeinterface";

// FriendListState

export interface FriendList {
    accepted: boolean;
    id: number;
    sender_id: number;
    receiver_id: number;
    firstname: string;
    lastname: string;
    imageurl: string;
    bio: string;
}

export interface FriendListState {
    users: Array<FriendList>;
}

const initialState: FriendListState = {
    users: [],
};

export const friendslistslice = createSlice({
    name: "friendslist",
    initialState,
    reducers: {
        getFriendship: (state, action: PayloadAction<Array<FriendList>>) => {
            console.log("Hello where is my payload?", action.payload);
            state.users = action.payload;
        },
        // cancelFriendship: (state, userFriendListId: PayloadAction<number>) => {
        //     const userFriendListIndex = state.users.findIndex(
        //         (user) => user.id === userFriendListId.payload
        //     );
        //     state.users.splice(userFriendListIndex, 1);
        // },
        // acceptFriendship: (state, userFriendListId: PayloadAction<number>) => {
        //     const userFriendListIndex = state.users.findIndex(
        //         (user) => user.id === userFriendListId.payload
        //     );
        //     state.users[userFriendListIndex].accepted = true;
        // },
    },
});

/// Exporting the Actions
// cancelFriendship, acceptFriendship;
export const { getFriendship } = friendslistslice.actions;

/// Exporting the Reducer
export default friendslistslice.reducer;
