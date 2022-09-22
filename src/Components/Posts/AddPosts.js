import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import { toast } from "react-toastify";

export default function AddPosts() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    email: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Posts");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            email: user.email,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className="publish-post">
      {!user ? (
        <>
          <h2>
            <Link to="/login">Login to create article</Link>
          </h2>
          Don't have an account? <Link to="/register">Signup</Link>
        </>
      ) : (
        <>
          <p className="text-2xl">Publica tu mascota en adopcion</p>
          <br />
          <div className="form-group">
            <label htmlFor="">Titulo</label>
            <br />
            <input
              type="text"
              name="title"
              className="input w-full max-w-xs"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* description */}
          <label htmlFor="">Descripcion</label>
          <br />
          <textarea
            name="description"
            className="input w-full max-w-xs"
            style={{ resize: "none" }}
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
          <br />
          {/* image */}
          <label htmlFor="">Subir imagen</label>
          <br />
          <input
            type="file"
            name="image"
            accept="image/*"
            /* className="form-control" */
            onChange={(e) => handleImageChange(e)}
          />
          <br />
          <br />
          {progress === 0 ? null : (
            <div className="progress">
              <div className="progress-bar progress-bar-striped mt-2">
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}
          <button className="btn btn-primary" onClick={handlePublish}>
            Publicar
          </button>
        </>
      )}
    </div>
  );
}
