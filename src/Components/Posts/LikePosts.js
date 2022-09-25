import React, { useContext } from "react";

import { db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { AuthContext } from "../../context/auth";
export default function LikeArticle({ id, likes }) {

    const { user } = useContext(AuthContext)

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
                className="text-xs"
                style={{
                    cursor: "pointer",
                
                }}
                onClick={handleLike}>💙</button>


        </div>
    );
}