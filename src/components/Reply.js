import React, { useState } from "react";

function Reply({ reply, onUpvote, onDownvote, onDelete }) {
  const [content, setContent] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(reply.id);
  };

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
      <p>Posted by: {reply.user.username}</p>
      <img src={reply.user.image.png} alt={reply.user.username} />
    </div>
  );
}

export default Reply;
