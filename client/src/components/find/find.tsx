import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface User {
    id: number;
    firstname: string;
    lastname: string;
    imageurl: string;
    bio: string;
}

export default function Find() {
    // const [users, setUssers] = useState<{ name: string }[]>([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
        console.log("search: ", search);
        fetch(`/users?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("The data from server: ", data);
                setSearchResults(data.rows); /// slice(0, 3) to limit results
                console.log("searchResults: ", searchResults);
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
            <section>
                {searchResults.map((user) => (
                    <div className="searchProfil" key={user.id}>
                        {user.firstname} {user.lastname}
                        {/* <img */}
                        <Link to={`/user/${user.id}`}>
                            <img
                                src={user.imageurl || "/logo.png"}
                                alt={`${user.firstname}, ${user.lastname}`}
                                // onClick={() => props.togglePopup()}
                            />
                        </Link>
                    </div>
                ))}
            </section>
        </section>
    );
}
