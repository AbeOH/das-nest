import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Find() {
    const [users, setUsers] = useState<{ name: string }[]>([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState<{ name: string }[]>([]);

    // const handleSearch = (users: { name: string }[]) => {
    //     const filteredUsers = users.filter((user) => {
    //         // return
    //         user.name.toLowerCase().includes(search.toLowerCase());
    //     });
    //     setSearchResults(filteredUsers);
    // };

    useEffect(() => {
        fetch("/users?search=" + search, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                setSearch(data);
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    }, [search]);

    return (
        <section>
            <div className="search">
                <h2>Search Friends</h2>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(evt.target.value);
                    }}
                />
            </div>
            <div></div>
        </section>
    );
}
