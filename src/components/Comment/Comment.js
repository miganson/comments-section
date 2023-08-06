import React, { useState } from "react";
import "./Comment.css";

function Comment({ comment, onUpvote, onDownvote, onDelete, onReply }) {
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = "yoda"; // replace this with actual current user

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(comment.id);
  };

  const username = comment.user.username || "Anonymous";
  const userImage = comment.user.image
    ? comment.user.image.png
    : "avatars/anon.png";

  const isCurrentUser = currentUser === username;
  function timeAgo(timestamp) {
    const date = new Date(timestamp);
    const secondsAgo = (Date.now() - date.getTime()) / 1000;

    if (secondsAgo < 60) return "Just now";
    if (secondsAgo < 3600)
      return `${Math.floor(secondsAgo / 60)} minute${
        Math.floor(secondsAgo / 60) > 1 ? "s" : ""
      } ago`;
    if (secondsAgo < 86400)
      return `${Math.floor(secondsAgo / 3600)} hour${
        Math.floor(secondsAgo / 3600) > 1 ? "s" : ""
      } ago`;
    if (secondsAgo < 2592000)
      return `${Math.floor(secondsAgo / 86400)} day${
        Math.floor(secondsAgo / 86400) > 1 ? "s" : ""
      } ago`;
    if (secondsAgo < 31536000)
      return `${Math.floor(secondsAgo / 2592000)} month${
        Math.floor(secondsAgo / 2592000) > 1 ? "s" : ""
      } ago`;

    const years = Math.floor(secondsAgo / 31536000);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  const handleReply = () => {
    onReply();
  };

  return (
    <div className="comment">
      <div className="vote-buttons">
        <div onClick={onUpvote}>+</div>
        <p>{comment.score}</p>
        <div onClick={onDownvote}>-</div>
      </div>
      <div className="content-area">
        <div className="user-info">
          <img src={userImage} alt={username} />
          <p>{username}</p>
          <p className="timestamp">{timeAgo(comment.createdAt)}</p>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
        <div className="actions">
          {isCurrentUser ? (
            <>
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
              <button
                className="reply"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing ? "Update" : "Edit"}
              </button>
            </>
          ) : (
            <button className="reply" onClick={handleReply}>
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
