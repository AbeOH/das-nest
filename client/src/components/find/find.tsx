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
    // const [users, setUsers] = useState<{ name: string }[]>([]);
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
        <section>
            <div className="search">
                <h2>Search Friends</h2>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(evt.target.value);
                    }}
                    value={search}
                />
            </div>
            <div>
                {searchResults.map((user) => (
                    <div key={user.id}>{user.firstname}</div>
                ))}
            </div>
        </section>
    );
}

// const handleSearch = (users: { name: string }[]) => {
//     const filteredUsers = users.filter((user) => {
//         // return
//         user.name.toLowerCase().includes(search.toLowerCase());
//     });
//     setSearchResults(filteredUsers);
// };
