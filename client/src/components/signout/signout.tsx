import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { MyLink } from "./mylink/mylink.tsx";
// import { ReactNode } from "react";

// interface Props {
//     id: number;
// }

// export default function SignOut() {
//     const handleDeleteCookies = () => {
//         // Delete all cookies
//         document.cookie.split(";").forEach((c) => {
//             document.cookie = c
//                 .replace(/^ +/, "")
//                 .replace(
//                     /=.*/,
//                     "=;expires=" + new Date().toUTCString() + ";path=/"
//                 );
//         });
//         // Reload the page
//         window.location.reload();
//     };

//     return <button onClick={handleDeleteCookies}>Delete Cookies</button>;
// }

// { children, to }: Props
export default function SignOut() {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    // isLoading to true

    useEffect(() => {
        fetch("/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                navigate("/");
                // setLoading(false);
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    });
    if (isLoading) {
        return <div> Loading... </div>;
    }
    return <Navigate to="/" />;
}
