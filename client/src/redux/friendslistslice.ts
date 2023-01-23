import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Action } from "../app/typeinterface";

// FriendListState

export interface FriendList {
    id: number;
    sender_id: number;
    recipient_id: number;
    accepted: boolean;
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
    name: "friendship",
    initialState,
    reducers: {
        // addFriendship: (
        //     state,
        //     userFriendListId: PayloadAction<Array<FriendList>>
        // ) => {
        //     state.users = userFriendListId.payload;
        // },
        cancelFriendship: (state, userFriendListId: PayloadAction<number>) => {
            const userFriendListIndex = state.users.findIndex(
                (user) => user.id === userFriendListId.payload
            );
            state.users.splice(userFriendListIndex, 1);
        },
        acceptFriendship: (state, userFriendListId: PayloadAction<number>) => {
            const userFriendListIndex = state.users.findIndex(
                (user) => user.id === userFriendListId.payload
            );
            state.users[userFriendListIndex].accepted = true;
        },
    },
});

/// Exporting the Actions
export const { addFriendship, cancelFriendship, acceptFriendship } =
    friendslistslice.actions;

/// Exporting the Reducer
export default friendslistslice.reducer;
