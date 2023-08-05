import React, { useState } from 'react';

function Comment({ comment, onDelete }) {
  const [score, setScore] = useState(comment.score);
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpvote = () => setScore(score + 1);
  const handleDownvote = () => setScore(score - 1);
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleDelete = () => {
    onDelete(comment.id);
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
      <p>Posted by: {comment.user.username}</p>
      <img src={comment.user.image.png} alt={comment.user.username} />
    </div>
  );
}

export default Comment;
