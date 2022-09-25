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
import { updateProfile, deleteUser, updatePassword } from "firebase/auth";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  console.log(user);
  const current = getAuth().currentUser;
  console.log("CURRENT", current);
  const navigate = useNavigate("");

  const [newData, setnewData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    setnewData({ [e.target.name]: e.target.value });
  };

  //CAMBIAR NOMBRE USUARIO

  async function changeName() {
    const auth = getAuth();
    await updateProfile(auth.currentUser, newData.name)
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      name: newData.name,
    });
    window.location.reload();
  }

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      console.log("DOC", docSnap.data());
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

  //CAMBIARCONTRASEÑA
  function contraseñaNueva() {
    const auth = getAuth();

    const user = auth.currentUser;
    const newPassword = "nuevacontraseña";

    updatePassword(user, newPassword)
      .then(() => {
        console.log("Update successful");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }

  //ELIMINAR CUENTA

  // function deleteUser() {

  //     const auth = getAuth();
  //     const user = auth.currentUser;
  //     console.log("USER DELETE", user)
  //     deleteUser(user).then(() => {
  //         // User deleted.
  //         console.log(user)
  //     }).catch((error) => {
  //         // An error ocurred
  //         // ...
  //         console.log(error)
  //     });

  // }

  const deleteUsuario = async (password) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    console.log(credential);
    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    // // Pass result.user here
    await deleteUser(result.user);

    console.log("success in deleting");
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
          <div>
            <h3>{user.name}</h3>
            <button onClick={() => changeName()}>Cambiar nombre</button>
            <input
              type="text"
              name="name"
              value={newData.name}
              placeholder="Instar nuevo nombre"
              onChange={handleChange}
            />
          </div>
          <div>
            <p>{user.email}</p>
          </div>
          <button onClick={() => contraseñaNueva()}>Cambiar contraseña</button>
          <hr />
          <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
      <button onClick={() => deleteUsuario()}>Eliminar cuenta</button>
    </section>
  ) : null;
};

export default Profile;
