import React, { useState, useEffect } from "react";
import Camera from "../Components/Chat/svg/Camera";
import Img from "../Assets/img/avatar.jpg";
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
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import "../styles/Profile.css"

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  const navigate = useNavigate("");

  const [newData, setnewData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    setnewData({ [e.target.name]: e.target.value });
  };

  async function changeName() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, newData.name)
   
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      name: newData.name,
    });
    window.location.reload();
  }

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
      const confirm = window.confirm("Eliminar avatar?");
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

  async function changeEmail() {
    const auth = getAuth();
    await updateEmail(auth.currentUser, newData.email)
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
        email: newData.email,

  })
  window.location.reload();
}

  return user ? (
    <div className="mockup-window lg:w-1/2 mx-auto mb-96 mt-10 bg-neutral">
      <div className="px-4 py-16 bg-base-200">
      <div className="profile_container p-3 justify-center">
                <div className="img_container w-32">
                    <img className="" src={user.avatar || Img} alt="avatar" />
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
                    <div>
                    <p className="mt-1">{user.name}</p>
                        <input
                            type="text"
                            name="name"
                            value={newData.name}
                            placeholder={user.name}
                            onChange={handleChange}
                        />
                        <button className="btn btn-xs btn-primary ml-4 mt-3" onClick={() => changeName()}>Cambiar nombre</button>
                      </div>
                    <div>
                        <p className="mt-1 pt-3">{user.email}</p>
                        <input
                            type="text"
                            name="email"
                            value={newData.email}
                            placeholder={user.email}
                            onChange={handleChange}
                            
                        />
                        <button className="btn btn-xs btn-primary ml-4 mt-3" onClick={changeEmail}>Cambiar correo</button>
                    </div>
                    <small>Usuario desde: {user.createdAt.toDate().toDateString()}</small>
                </div>
            </div>
      </div>
    </div>
  ) : null;
};

export default Profile;
