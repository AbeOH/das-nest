import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState, FormEvent } from "react";
// import groupsslice from "../../redux/groupsslice";

// interface GroupsState {
//     group_name: string;
//     group_description: string;
//     group_url: string;
//     fileUrl: File | null;
//     // updateImageClosePopup: Function;
// }

export function Groups() {
    const [group_name, setGroup_name] = useState("");
    const [group_description, setGroup_description] = useState("");
    const [group_url, setGroup_url] = useState("");
    const [fileUrl, setFileUrl] = useState<File | null>(null);
    // const [updateImageClosePopup, setUpdateImageClosePopup] = useState<

    const handleUpload = (evt: React.SyntheticEvent) => {
        evt.preventDefault();
        const formData = new FormData();
        if (fileUrl === null) {
            return;
        }
        formData.append("file", fileUrl);
        fetch("/groupupload", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                // updateImageClosePopup(data.imageurl); adjust this
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    };

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const property = evt.target.name; // This line will hold value when input for value is changed
        const value = evt.target.value;
        console.log("Evt Target", evt.target);
        // props.setState({ [property]: value }); // This line will update value prob dynamically in this.state variable
    };

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        // const { group_name } = this.setState;
        fetch("/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                group_name: group_name,
                // group_descripton: group_description,
                // group_url: group_url,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data: ", data);
                // if (data.success) {
                //     location.reload();
                // } else {
                //     this.setState({
                //         errormsg:
                //             "Something went wrong. Please try again later or with a different email",
                //     });
                // }
            });
    };

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
                            type="text"
                            name="group_url"
                            value={group_url}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Create Group</button>
                </form>
            </div>
        </section>
    );
}

/// Later Reduxification
// const dispatch = useDispatch();

// const groups = useSelector((state: RootState) => state.groups);

// useEffect(() => {
//     dispatch(groupsslice.actions.getGroups());
// }, [dispatch]);
