import React, { useState } from 'react';

function Reply({ reply, onDelete }) {
  const [score, setScore] = useState(reply.score);
  const [content, setContent] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpvote = () => setScore(score + 1);
  const handleDownvote = () => setScore(score - 1);
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
      <p>Score: {score}</p>
      <button onClick={handleUpvote}>Upvote</button>
      <button onClick={handleDownvote}>Downvote</button>
      <button onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={handleDelete}>Delete</button>
      <p>Replying to: {reply.replyingTo}</p>
      <p>Posted by: {reply.user.username}</p>
      <img src={reply.user.image.png} alt={reply.user.username} />
    </div>
  );
}

export default Reply;
