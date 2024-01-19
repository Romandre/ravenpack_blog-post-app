import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Link } from "react-router-dom";

import "../assets/css/Posts.css";

function Posts() {
  const { posts, activeUser } = useContext(DataContext);
  const postsList =
    posts && activeUser
      ? posts.filter((post) => post.userId.toString() === activeUser)
      : posts;

  return postsList ? (
    <>
      <div className="title">Posts</div>
      <div className="posts">
        {postsList &&
          postsList.map((post) => (
            <div className="card" key={post.id}>
              <p>
                <strong>{post.title}</strong>
              </p>
              <p>{post.body}</p>
              <div>
                <Link to={`/post/${post.id}`}>Read more</Link>
                <span className="user">User {post.userId}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  ) : (
    <div>No posts found</div>
  );
}

export default Posts;
