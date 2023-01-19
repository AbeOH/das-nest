import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface OtherUsersProps {
    // senderId: number;
    receiverFriendId: number;
}

export default function FriendButton(props: OtherUsersProps) {
    // const [senderId, setSenderId] = useState<number | null>(null);

    const [friendStatusButton, setFriendStatusButton] =
        useState<boolean>(false);

    // const [addFriend, setAddFriend] = useState<boolean>(false);
    // const [cancelFriend, setCancelFriend] = useState<boolean>(false);

    // const [messageButton, setMessageButton] = useState<boolean>(false);

    // const friendButtonToggle = (evt: React.SyntheticEvent) => {
    //     setFriendStatusButton(!friendStatusButton);
    // };

    /// Friendship status: Modify to get senderId from cookies
    useEffect(() => {
        console.log("Unmounting FriendButton component");
        fetch(`/friendshipStatus/${props.receiverFriendId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus } = data;
                    setFriendStatusButton(friendStatus);
                }
            });
    }, [props.receiverFriendId]);

    /// Insert Friendship

    const updateFriendshipStatus = (evt: React.SyntheticEvent) => {
        let url = "";
        switch (friendStatusButton) {
            case "UNFRIEND":
            case "CANCEL":
                /// URL =
                break;
            case "ACCEPT":
                //// URL =
                break;
        }

        fetch(`/friendStatusUpdate/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus } = data;
                    setFriendStatusButton(friendStatus);
                }
            });
    };

    /// Notes
    //// Current status of friendship and what action the user is trying to do

    /// Update Friendship

    return (
        <>
            <button onClick={(evt) => updateFriendshipStatus(evt)}>
                {friendStatusButton}
            </button>
        </>
    );
}
