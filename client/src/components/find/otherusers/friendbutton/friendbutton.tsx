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
    // const [senderId, setSenderId] = useState<number | null>(null);

    const [friendStatusButton, setFriendStatusButton] =
        useState<boolean>(false);

    const [friendshipStatusText, setfriendshipStatusText] =
        useState<string>("");

    // const [addFriend, setAddFriend] = useState<boolean>(false);
    // const [cancelFriend, setCancelFriend] = useState<boolean>(false);
    // const [messageButton, setMessageButton] = useState<boolean>(false);
    // const friendButtonToggle = (evt: React.SyntheticEvent) => {
    //     setFriendStatusButton(!friendStatusButton);
    // };

    /// Friendship status: Modify to get senderId from cookies
    useEffect(() => {
        console.log("Unmounting FriendButton component");
        fetch(`/friendshipStatus/${props.receiverFriendId}`)
            .then((res) => res.json())
            .then((data: Data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus, accepted } = data;
                    setFriendStatusButton(accepted);
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

        fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ friendStatusButton }),
        })
            .then((res) => res.json())
            .then((data: Data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus, accepted } = data;
                    setFriendStatusButton(accepted);
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
