import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function LikeArticle({ id, likes }) {
    const { user } = useAuth();

    const likesRef = doc(db, "Posts", id);

    const handleLike = () => {
        if (likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid),
            }).then(() => {
                console.log("unliked");
            }).catch((e) => {
                console.log(e);
            });
        }
        else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid)
            }).then(() => {
                console.log("liked");
            }).catch((e) => {
                console.log(e);
            });
        }
    };
    return (
        <div>
            <button
                style={{
                    cursor: "pointer",
                    color: likes?.includes(user.uid) ? "red" : null,
                }}
                onClick={handleLike}>Like</button>


        </div>
    );
}