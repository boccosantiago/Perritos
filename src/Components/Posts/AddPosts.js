import { useState, useContext } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase";
import { AuthContext } from "../../context/auth";
import LogMessage from "../LogMessage";
import { success, deleted } from "../../toast";

export default function AddPosts(props) {

  const { user } = useContext(AuthContext);

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

  const [error, setError] = useState("")
  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      setError("Complete todos los campos.");
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
            createdBy: props.registeredName,
            userId: user.uid,
            email: user.email,
            likes: [],
            comments: [],
          })
            .then(() => {
              success("Anuncio agregado correctamente")
              setProgress(0);
            })
            .catch((err) => {
              deleted("Error al publicar anuncio")
            });
        });
      }
    );
  };

  return (
    <div className="publish-post bg-stone-200">
      {!user ? (
        <LogMessage text={"Inicia sesión para poder publicar."} />
      ) : (
        <>
          <p className="text-2xl">Publica tu anuncio.</p>
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

          <label htmlFor="">Descripción</label>
          <br />
          <textarea
            name="description"
            className="input w-full max-w-xs"
            style={{ resize: "none" }}
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <label htmlFor="">Subir imagen</label>
          <br />
          <input
            style={{width:'300px'}}
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
          <br />
          <br />
          {progress === 0 ? null : (
            <div className="progress">
              <div className="progress-bar progress-bar-striped mt-2">
                {`cargando imagen ${progress}%`}
              </div>
            </div>
          )}
          <button className="btn btn-primary" onClick={handlePublish}>
            Publicar
          </button>
          <div className="text-red-600">{error ? error : ""}</div>
        </>
      )}
    </div>
  );
}
