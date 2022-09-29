import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import {success, deleted} from "../../toast";

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
        if (window.confirm("Está seguro de querer eliminar este anuncio?")) {
            try {
                await deleteDoc(doc(db, "Posts", id));
                success("Anuncio eliminado correctamente")
                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            } catch (error) {
                deleted("Error al eliminar anuncio")
                console.log(error);
            }
        }
    };
    return (
        <div>
            <button onClick={handleDelete}
               className="btn btn-xs">Delete</button>

        </div>
    );
}