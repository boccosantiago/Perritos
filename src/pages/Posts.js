import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import AddPosts from "../Components/Posts/AddPosts";
import LikePosts from "../Components/Posts/LikePosts";
import DeletePosts from "../Components/Posts/DeletePosts";
import { AuthContext } from "../context/auth";
import "../styles/Posts.css";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const post = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(post);
    });
  }, []);

  return (
    <>
      <AddPosts registeredName={props.registeredName} />
      <div
        className=" grid md:grid-cols-3 bg-stone-100 "
        style={{ minHeight: "62vh" }}
      >
        {posts.length === 0 ? (
          <p>No se encontraron publicaciones.</p>
        ) : (
          posts.map(
            ({
              id,
              title,
              description,
              imageUrl,
              createdAt,
              createdBy,
              userId,
              likes,
              email,
            }) => (
              <div key={id} className="posts-main m-auto">
                <div className="border rounded-xl p-5 m-3">
                  <div>
                    <Link to={`/posts/${id}`}>
                      <img
                        className="lg:h-52 object-contain m-auto"
                        src={imageUrl}
                        alt="title"
                      />
                    </Link>
                  </div>
                  <div className="grid">
                    <div className="row">
                      <div className="col-6">
                        {createdBy && (
                          <span className="badge bg-primary mt-3 border-none">
                            Creado por: {createdBy}
                          </span>
                        )}
                        <br />
                      </div>
                    </div>
                    <p className="text-xs	">
                      {createdAt.toDate().toLocaleDateString("es-ES", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                    <h3 className="py-3 font-bold">{title}</h3>
                    <span className="text-justify	">{description}</span>
                    <p className="text-left"> Contacta conmigo:</p>
                    <p className="text-left">{email} o búscame en el chat.</p>
                    <div className="justify-center mt-3">
                      <div className="flex justify-center">
                        {user && <LikePosts id={id} likes={likes} />}
                        <div className="pe-2">
                          <p className="px-1">{likes?.length} likes</p>
                        </div>
                      </div>
                      <div className="">
                        {user && user.uid === userId && (
                          <DeletePosts id={id} imageUrl={imageUrl} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}
