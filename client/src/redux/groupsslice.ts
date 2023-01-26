import { createSlice, createAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";

const groupsSlice = createSlice({
    name: "groups",
    initialState: {
        groups: [],
    },
    reducers: {
        addGroup: (state, action: PayloadAction<string>) => {
            state.groups.push(action.payload);
        },
    },
});

const store = createStore(
    combineReducers({
        groups: groupsSlice.reducer,
    })
);

export const { addGroup } = groupsSlice.actions;

export default store;
