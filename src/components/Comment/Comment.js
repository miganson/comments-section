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
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p>{content}</p>
      )}
      <p>
        Posted {timeAgo(comment.createdAt)} by: {username}
      </p>
      <p>Score: {comment.score}</p>
      <button onClick={onUpvote}>Upvote</button>
      <button onClick={onDownvote}>Downvote</button>
      <button onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={handleDelete}>Delete</button>
      <p>Posted by: {username}</p>
      <img src={userImage} alt={username} />
    </div>
  );
}

export default Comment;
