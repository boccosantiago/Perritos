import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import AddPosts from "./AddPosts";
export default function Posts () {
    const [posts, setPosts] = useState([]);
    

  const { user } = useAuth()
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
        <div>
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
              <div key={id}>
                <div >
                  <div >
                    <Link to={`/posts/${id}`}>
                      <img
                        src={imageUrl}
                        alt="title"
                        style={{ height: 180, width: 180 }}
                      />
                    </Link>
                  </div>
                  <div className="col-9 ps-3">
                    <div className="row">
                      <div className="col-6">
                        {createdBy && (
                          <span className="badge bg-primary">{createdBy}</span>
                        )}
                      </div>
                      {/* <div className="col-6 d-flex flex-row-reverse">
                        {user && user.uid === userId && (
                          <DeleteArticle id={id} imageUrl={imageUrl} />
                        )}
                      </div> */}
                    </div>
                    <h3>{title}</h3>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <h5>{description}</h5>
  
                    {/* <div className="d-flex flex-row-reverse">
                      {user && <LikeArticle id={id} likes={likes} />}
                      <div className="pe-2">
                        <p>{likes?.length} likes</p>
                      </div>
                      {comments && comments.length > 0 && (
                        <div className="pe-2">
                          <p>{comments?.length} comments</p>
                        </div>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            )
          )
        )}
        <div>
            <AddPosts/>
        </div>
        </div>
    )
}