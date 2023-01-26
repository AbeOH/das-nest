import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState, FormEvent } from "react";
// import groupsslice from "../../redux/groupsslice";

interface GroupsState {
    group_name: string;
    group_description: string;
    group_url: string;
}

export function Groups(probs: GroupsState) {
    // const [group_name, setGroup_name] = useState("");
    // const dispatch = useDispatch();
    // const groups = useSelector((state: RootState) => state.groups);

    // useEffect(() => {
    //     dispatch(groupsslice.actions.getGroups());
    // }, [dispatch]);

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const property = evt.target.name; // This line will hold value when input for value is changed
        const value = evt.target.value;
        console.log("Evt Target", evt.target);
        this.setState({ [property]: value }); // This line will update value prob dynamically in this.state variable
    };

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        const { group_name } = this.state;
        console.log("Submit", this.state);
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
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="group_name">Group Name</label>
                        <input
                            required
                            type="text"
                            name="group_name"
                            value={this.state.group_name}
                            onChange={this.handleInputChange}
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
                            value={this.state.group_description}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="group_url">Group URL</label>
                        <input
                            required
                            type="text"
                            name="group_url"
                            value={this.state.group_url}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button type="submit">Create Group</button>
                </form>
            </div>
        </section>
    );
}
