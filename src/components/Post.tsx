import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../DataProvider";
import { Link } from "react-router-dom";

import "../assets/css/Post.css";

function Post() {
  const { postId } = useParams();
  const { posts, comments } = useContext(DataContext);
  const post = posts.filter((post) => post.id.toString() === postId)[0];
  const commentsList = comments.filter(
    (comment) => comment.postId.toString() === postId
  );

  return post ? (
    <div className="post">
      <Link to="/">
        <button>
          <i className="arrow left"></i>Back to posts
        </button>
      </Link>
      <div className="post-card">
        <div className="post-content">
          <span className="title">{post.title}</span>
          <p className="body">{post.body}</p>
          <p className="user">User: {post.userId}</p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="comments">
        <span className="comments-title">Post comments</span>
        <div className="comments-wrapper">
          {commentsList.map((comment) => (
            <div className="comment" key={comment.id}>
              <div>
                <strong>Name:</strong> {comment.name}
              </div>
              <div>
                <strong>Email:</strong> {comment.email}
              </div>
              <div>{comment.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>No post found...</div>
  );
}

export default Post;
