import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import AddPosts from "./AddPosts";
import LikePosts from "./LikePosts";
import DeletePosts from "./DeletePosts";
import "../../styles/Posts.css";
import MainChat from "../Chat/MainChat";
// import User from "../Chat/User"

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const [userClicked, setUserClicked] = useState(null)
  console.log(userClicked)
  const [show, setShow] = useState(false)
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
  console.log(posts);

  return (
    <div className="posts-container">
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
            email
          }) => (
            <div key={id} onClick={() => setUserClicked({ email, userId })}>
              <div className="posts">
                <div>
                  <Link to={`/posts/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                    />
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">Creado por: {createdBy}</span>
                      )}
                      <br />
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <p>Publicado: {createdAt.toDate().toDateString()}</p>
                  <span>{description}</span>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikePosts id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeletePosts id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  {/* <button onClick={() => setShow(!show)}>
                    Escríbeme!
                  </button> */}
                  {/* <User user1={user} user={userClicked} /> */}
                  <button>Chat</button>
                </div>
              </div>
            </div>
          )
        )
      )}

      <AddPosts />
      {/* <div>
        {show ? <MainChat userClicked={userClicked} /> : <div></div>}
      </div> */}

    </div>
  );
}
