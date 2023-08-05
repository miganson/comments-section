import React, { useState } from "react";
import "./Reply.css";

function Reply({ reply, onUpvote, onDownvote, onDelete }) {
  const [content, setContent] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(reply.id);
  };

  const username = reply.user.username || "Anonymous";
  const userImage = reply.user.image
    ? reply.user.image.png
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
    <div className="reply">
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
        Posted {timeAgo(reply.createdAt)} by: {username}
      </p>

      <p>Score: {reply.score}</p>
      <button onClick={onUpvote}>Upvote</button>
      <button onClick={onDownvote}>Downvote</button>
      <button onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={handleDelete}>Delete</button>
      <p>Replying to: {reply.replyingTo}</p>
      <p>Posted by: {username}</p>
      <img src={userImage} alt={username} />
    </div>
  );
}

export default Reply;
