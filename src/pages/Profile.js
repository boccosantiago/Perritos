import React, { useState, useEffect } from "react";
import Camera from "../Components/Chat/svg/Camera";
import Img from "../image1.jpg";
import { storage, db, auth } from "../firebase";
import {
    ref,
    getDownloadURL,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../Components/Chat/svg/Delete";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [img, setImg] = useState("");
    const [user, setUser] = useState();
    console.log(user)
    const navigate = useNavigate("");

    useEffect(() => {

        getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }

        });

        if (img) {
            const uploadImg = async () => {
                const imgRef = ref(
                    storage,
                    `avatar/${new Date().getTime()} - ${img.name}`
                );
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath));
                    }
                    const snap = await uploadBytes(imgRef, img);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

                    await updateDoc(doc(db, "users", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath,
                    });

                    setImg("");
                } catch (err) {
                    console.log(err.message);
                }
            };
            uploadImg();
        }
    }, [img]);

    const deleteImage = async () => {
        try {
            const confirm = window.confirm("Delete avatar?");
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath));

                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar: "",
                    avatarPath: "",
                });
                navigate("/");
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    return user ? (
        <section>
            <div className="profile_container">
                <div className="img_container">
                    <img src={user.avatar || Img} alt="avatar" />
                    <div className="overlay">
                        <div>
                            <label htmlFor="photo">
                                <Camera />
                            </label>
                            {user.avatar ? <Delete deleteImage={deleteImage} /> : null}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="photo"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>
                <div className="text_container">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <hr />
                    <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
                </div>
            </div>
        </section>
    ) : null;
};

export default Profile;