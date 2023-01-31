import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState, FormEvent } from "react";
// import groupsslice from "../../redux/groupsslice";
import { Link } from "react-router-dom";
import Post from "../posts/posts";
import { useParams, useNavigate } from "react-router-dom";

interface GroupsState {
    id: number;
    // group_id: number;
    name: string;
    description: string;
    imageurl: string;
    // fileUrl: File | null;
    // updateImageClosePopup: Function;
}

export function Groups() {
    // const params = useParams();
    // const group_id = +(params.id ?? 0);
    // console.log("Whhich id is here", group_id);

    const [group_name, setGroup_name] = useState("");
    const [group_description, setGroup_description] = useState("");
    const [fileUrl, setFileUrl] = useState<File | null>(null);
    // const [updateImageClosePopup, setUpdateImageClosePopup] = useState<
    const [groups, setGroups] = useState<GroupsState[]>([]);

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const property = evt.target.name; // This line will hold value when input for value is changed
        const value = evt.target.value;
        // console.log("Evt Target", evt.target);
        switch (property) {
            case "group_name":
                setGroup_name(value);
                break;
            case "group_description":
                setGroup_description(value);
                break;
            case "file_Url":
                if (evt.target.files !== null) {
                    setFileUrl(evt.target.files[0]);
                }
                break;
        }
    };

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        const formData = new FormData();
        // formData.append("group_id", group_id.toString());
        formData.append("group_name", group_name);
        formData.append("group_description", group_description);
        formData.append("file_Url", fileUrl as File);

        console.log("formData: ", formData);

        fetch("/createGroups", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("data: ", json);
                if (json.status === "success") {
                    setGroups([...groups, json.data]);
                } else {
                    console.log("Error: ", json);
                }
            });
    };

    useEffect(() => {
        fetch("/getGroups")
            .then((res) => res.json())
            .then((data: GroupsState[]) => {
                console.log("Group data: ", data);
                setGroups(data);
            });
    }, []);

    // console.log("Groups: ", groups);
    return (
        <section>
            <div>
                <h1>Want to create a Group?</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="group_name">Group Name</label>
                        <input
                            required
                            type="text"
                            name="group_name"
                            value={group_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="group_description">
                            Group Description
                        </label>
                        <input
                            required
                            type="text"
                            name="group_description"
                            value={group_description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="group_url">Group URL</label>
                        <input
                            required
                            type="file"
                            name="file_Url"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Create Group</button>
                </form>
            </div>
            <div>
                <h1>Groups</h1>
                <div className="group-container">
                    {groups.map((group) => (
                        <div key={group.id} className="group-item">
                            <h2>{group.name}</h2>
                            <p>{group.description}</p>
                            <Link to={`/post/${group.id}`}>
                                <img
                                    src={group.imageurl || "/logo.png"}
                                    // alt={`${friend.firstname} ${friend.lastname}`}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// const handleUpload = (evt: React.SyntheticEvent) => {
//     evt.preventDefault();
//     const formData = new FormData();
//     if (fileUrl === null) {
//         return;
//     }
//     formData.append("file", fileUrl);

//     fetch("/groupupload", {
//         method: "POST",
//         body: formData,
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log("data from server: ", data);
//             // updateImageClosePopup(data.imageurl); adjust this
//         })
//         .catch((err) => {
//             console.log("Errrrrrror in fetch: ", err);
//         });
// };

/// Later Reduxification
// const dispatch = useDispatch();

// const groups = useSelector((state: RootState) => state.groups);

// useEffect(() => {
//     dispatch(groupsslice.actions.getGroups());
// }, [dispatch]);
