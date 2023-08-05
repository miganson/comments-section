import React, { useState } from "react";
import "./Reply.css";

function Reply({ reply, onUpvote, onDownvote, onDelete }) {
  console.log(reply); // Add this line

  const [content, setContent] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(reply.id);
  };

  const username = reply.user.username || "Anonymous";
  const userImage = reply.user.image ? reply.user.image.png : "avatars/anon.png";


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
