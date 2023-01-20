import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import FriendButton from "./friendbutton/friendbutton";

// interface OtherUsersProbs {
//     // id: number;
//     // firstname: string;
//     // lastname: string;
//     // imgUrl: string;
//     // bio: string;
//
// props: OtherUsersProbs;

export default function OtherUsers() {
    const params = useParams();
    const id = +(params.id ?? 0);
    /// Getting to the other profile with id from params or search input
    console.log("What type is the id? ", typeof id);
    const [search, setSearch] = useState("");
    // const [searchResults, setSearchResults] = useState<OtherUsersProbs[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Data from other users ", data);
                    const { firstname, lastname, imageurl, bio } = data;
                    setFirstName(firstname);
                    setLastName(lastname);
                    setImgUrl(imageurl);
                    setEmail(email);
                    setBio(bio);
                }
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    }, []);

    return (
        <section className="section-otheruser">
            <header className="search">
                <h2>
                    {firstName} {lastName}{" "}
                </h2>

                <img
                    src={imgUrl || "/logo.png"}
                    alt={`${firstName}, ${lastName}`}
                    // onClick={() => props.togglePopup()}
                />
                <p>{email}</p>
                <p>{bio}</p>
                <FriendButton receiverFriendId={id} key={id} />

                {/* <Routes>
                    <Route path="friendshipStatus/:id" element={<FriendButton />} />
                </Routes> */}
            </header>
        </section>
    );
}
