import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Profil {
    firstname: string;
    lastname: string;
    image_url: string;
    bio: string;
}

export const initialState: Profil = {
    firstname: "",
    lastname: "",
    image_url: "",
    bio: "",
};

export const profilSlice = createSlice({
    name: "profil",
    initialState,
    reducers: {
        profilReceived: (state, action: PayloadAction<Profil>) => {
            console.log("action.payload: ", action.payload);
            state = action.payload;
        },
    },
});

export const { profilReceived } = profilSlice.actions;

export default profilSlice.reducer;
