import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface OtherUsersProbs {
    // senderId: number;
    receiverId: number;
}

export default function FriendButton(probs: OtherUsersProbs) {
    const [senderId, setSenderId] = useState<number | null>(null);
    const [friendStatus, setFriendStatus] = useState<boolean>(false);
    const [addFriend, setAddFriend] = useState<boolean>(false);
    const [cancelFriend, setCancelFriend] = useState<boolean>(false);

    /// Loggend in User Id status
    useEffect(() => {
        fetch(`/user/userInformation.json`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Data from other users ", data);
                    const { senderId } = data.id;
                    setSenderId(senderId);
                }
            });
    }, []);

    /// Friendship status
    useEffect(() => {
        fetch(`/friendship/${senderId}/${probs.receiverId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Friendship status", data);
                    const { friendStatus } = data.accepted;
                    setFriendStatus(friendStatus);
                }
            });
    }, []);

    /// Insert Friendship

    /// Delete Friendship
    return (
        <>
            <p>Hi</p>
        </>
    );
}
