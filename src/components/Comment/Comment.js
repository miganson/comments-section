import React, { useState } from "react";
import "./Comment.css";

function Comment({ comment, onUpvote, onDownvote, onDelete }) {
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(comment.id);
  };

  const username = comment.user.username || "Anonymous";
  const userImage = comment.user.image
    ? comment.user.image.png
    : "avatars/anon.png";

  function timeAgo(timestamp) {
    const date = new Date(timestamp); // Convert to Date object
    const secondsAgo = (Date.now() - date.getTime()) / 1000;

    if (secondsAgo < 60) return "Just now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
    return `${Math.floor(secondsAgo / 86400)} days ago`;
  }

  return (
    <div className="comment">
      <div className="vote-buttons">
        <button onClick={onUpvote}>+</button>
        <p>{comment.score}</p>
        <button onClick={onDownvote}>-</button>
      </div>
      <div className="content-area">
        <div className="user-info">
          <img src={userImage} alt={username} />
          <p>{username}</p>
          <p>Posted {timeAgo(comment.createdAt)}</p>
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
          <button onClick={isEditing ? handleSave : handleEdit}>
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
