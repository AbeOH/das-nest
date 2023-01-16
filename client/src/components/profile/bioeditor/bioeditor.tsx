import React, { useState, useEffect } from "react";

interface UploaderProps {
    firstName: string;
    lastName: string;
    // bio: string;
    // updateBio: Function;
    togglePopupBio: Function;
}

export default function BioEditor(props: UploaderProps) {
    const [bio, setBio] = useState("");
    const [editMode, setEditMode] = useState("");
    const [textVisible, setTextVisible] = useState(false);
    // const [editing, isEditing] = useState(true);

    useEffect(() => {
        fetch("/bio")
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                setBio(data.bio);
            })
            .catch((err) => {
                console.log("Errrrrrror in fetch: ", err);
            });
    }, [bio]);

    const updateBio = (evt: React.SyntheticEvent) => {
        evt.preventDefault();

        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: editMode,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from server: ", data);
                setBio(data.bio);
                togglePopupBio();
            })
            .catch((err) => {
                console.log("Error in fetch: ", err);
            });
    };
    const togglePopupBio = () => {
        setTextVisible(!textVisible);
    };
    return (
        <section>
            <div className="bio">
                <h2>Bio</h2>
                {!textVisible && (
                    <>
                        {bio && (
                            <button onClick={togglePopupBio}> Edit Bio</button>
                        )}
                    </>
                )}
                {!textVisible && (
                    <>
                        {!bio && (
                            <button onClick={togglePopupBio}>Add Bio</button>
                        )}
                    </>
                )}
                {textVisible && (
                    <div className="bioText">
                        <form
                            onSubmit={(evt: React.SyntheticEvent) =>
                                updateBio(evt)
                            }
                        >
                            <textarea
                                onChange={(
                                    evt: React.ChangeEvent<HTMLTextAreaElement>
                                ) => {
                                    setEditMode(evt.target.value);
                                }}
                                // name="bio"
                                placeholder="Tell us about yourself..."
                                // {bio}
                                defaultValue={bio}
                            ></textarea>
                            <button>Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
