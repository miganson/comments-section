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

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <p>{content}</p>
      )}
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
