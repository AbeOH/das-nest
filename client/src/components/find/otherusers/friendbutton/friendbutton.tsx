import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface OtherUsersProps {
    // senderId: number;
    receiverFriendId: number;
}

interface Data {
    friendStatus: string;
    accepted: boolean;
}

export default function FriendButton(props: OtherUsersProps) {
    const [friendshipStatusText, setfriendshipStatusText] =
        useState<string>("");

    /// Friendship status: Modify to get senderId from cookies
    useEffect(() => {
        console.log("Unmounting FriendButton component");
        fetch(`/friendshipStatus/${props.receiverFriendId}`)
            .then((res) => res.json())
            .then((data: Data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus } = data;
                    setfriendshipStatusText(friendStatus);
                }
            });
    }, []);

    /// Insert Friendship

    const updateFriendshipStatus = (evt: React.SyntheticEvent) => {
        // let url = "";
        const url = `/friendshipStatus/${
            props.receiverFriendId
        }/${friendshipStatusText.toLocaleLowerCase()}`;
        console.log("url: ", url);
        fetch(`${url}`)
            .then((res) => res.json())
            .then((data: Data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus } = data;
                    setfriendshipStatusText(friendStatus);
                }
            });
    };

    /// Notes
    //// Current status of friendship and what action the user is trying to do

    /// Update Friendship

    return (
        <>
            <button onClick={(evt) => updateFriendshipStatus(evt)}>
                {friendshipStatusText}
            </button>
        </>
    );
}

// switch (serverUrl) {

//     case "UNFRIEND":
//         url = `/friendshipStatus/${props.receiverFriendId}/unfriend`}`;
//         break;
//     case "CANCEL":
//         url = `/friendshipStatus/${props.receiverFriendId}/cancel`;
//         break;
//     case "ACCEPT":
//         url = `/friendshipStatus/${props.receiverFriendId}/accept`;
//         break;
//     case "ADD FRIEND":
//         url = `/friendshipStatus/${props.receiverFriendId}/addfriend`;
//         break;
// }
