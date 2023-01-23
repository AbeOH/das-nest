import { useSelector, useDispatch } from "react-redux";
import rootReducer from "../../redux/store";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
// import { friendslistbutton } from "./friendslistbutton";
// import { friendsButton } from "../otherusers/friendbutton";

export function Friends() {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.friendslist.users);
    const userId = useSelector((state: RootState) => state.user.userId);

    const acceptedFriends = users.filter((user) => user.accepted);
    const userPendingFriends = users.filter(
        (user) => !user.accepted && user.sender_id === userId
    );
    const otherPendingFriends = users.filter(
        (user) => !user.accepted && user.sender_id !== userId
    );

    /// Do I need to create db queries or can I reuse others?
    useEffect(() => {
        if (users.length === 0) {
            fetch(`friendshipStatusAll/`)
                .then((res) => res.json())
                .then((data) => {
                    // dispatch({ type: "RECEIVE_FRIENDS", users: data });
                });
        }
    }, []);

    return (
        <div>
            <h1>Friends</h1>
        </div>
    );
}
