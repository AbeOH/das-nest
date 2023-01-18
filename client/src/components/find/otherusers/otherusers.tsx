import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface OtherUsersProbs {
    id: number;
    firstname: string;
    lastname: string;
    imgUrl: string;
    bio: string;
}

export default function OtherUsers(props: OtherUsersProbs) {
    let id = useParams();
    /// Getting to the other profile with id from params or search input

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<OtherUsersProbs[]>([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        fetch(`/users?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    console.log("Data from server: ", data);
                    const { firstname, lastname, imageurl, bio } = data.rows[0];
                    setFirstName(firstname);
                    setLastName(lastname);
                    setImgUrl(imageurl);
                    setBio(bio);
                }
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    }, [search]);

    return (
        <section className="section-find">
            <header className="search">
                <h2>Search Friends</h2>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(evt.target.value);
                    }}
                    value={search}
                />
            </header>
        </section>
    );
}
