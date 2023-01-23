import { useSelector, useDispatch } from "react-redux";
import rootReducer from "../../redux/store";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import friendslistslice, { getFriendship } from "../../redux/friendslistslice";
// import { friendslistbutton } from "./friendslistbutton";
// import { friendsButton } from "../otherusers/friendbutton";

interface Props {
    myId: number;
}

export function Friends({ myId }: Props) {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.friendslist.users);

    const acceptedFriends = users.filter((user) => user.accepted);

    const myPendingFriends = users.filter(
        (user) => !user.accepted && user.receiver_id === myId
    );

    const sendingPendingFriends = users.filter(
        (user) => !user.accepted && user.sender_id !== myId
    );

    useEffect(() => {
        if (users.length === 0) {
            fetch(`/friendshipStatusAll`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("My dataaa: ", data);
                    dispatch(getFriendship(data.friendStatus));
                });
        }
    }, []);
    console.log("My pending", myPendingFriends);
    console.log("Sending pending", sendingPendingFriends);
    console.log("Accepted friends", acceptedFriends);

    return (
        <section>
            <h1>Friends</h1>
            {/* Accepted Friends */}
            <section>
                {acceptedFriends.length &&
                    acceptedFriends.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <img
                                    src={friend.imageurl}
                                    alt={`${friend.firstname} ${friend.lastname}`}
                                />
                                <p>
                                    {friend.firstname} {friend.lastname}
                                </p>
                                <button>Unfriend</button>
                            </div>
                        );
                    })}
            </section>
            {/* Pending Friends */}
            <section>
                {myPendingFriends.length &&
                    myPendingFriends.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <img
                                    src={friend.imageurl}
                                    alt={`${friend.firstname} ${friend.lastname}`}
                                />
                                <p>
                                    {friend.firstname} {friend.lastname}
                                </p>
                                <button>Pending</button>
                            </div>
                        );
                    })}
            </section>
            {/* Sending pending Friends */}
            <section>
                {sendingPendingFriends.length &&
                    sendingPendingFriends.map((friend) => {
                        return (
                            <div key={friend.id}>
                                <img
                                    src={friend.imageurl}
                                    alt={`${friend.firstname} ${friend.lastname}`}
                                />
                                <p>
                                    {friend.firstname} {friend.lastname}
                                </p>
                                <button>Cancel</button>
                            </div>
                        );
                    })}
            </section>
        </section>
    );
}
