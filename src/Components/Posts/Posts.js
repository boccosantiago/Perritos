import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import AddPosts from "./AddPosts";
import LikePosts from "./LikePosts";
import DeletePosts from "./DeletePosts";
import "../../styles/Posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const post = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(post);
      console.log(post);
    });
  }, []);
  return (
  <>
  <AddPosts />
    <div className="container m-auto flex w-1/4 flex-wrap">
      
      {posts.length === 0 ? (
        <p>No posts found!</p>
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
            comments,
          }) => (
            <div key={id} className='posts-main m-auto'>
              <div className="border rounded-xl p-5 m-7 ">
                <div>
                  <Link to={`/posts/${id}`}>
                    <img
                      className=" m-auto"
                      src={imageUrl}
                      alt="title"
                    />
                  </Link>
                </div>
                <div className="row">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">Creado por: {createdBy}</span>
                      )}
                      <br/>
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <p>Publicado: {createdAt.toDate().toDateString()}</p>
                  <span>{description}</span>

                  <div className="">
                    {user && <LikePosts id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
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
      </div></>
  );
}
