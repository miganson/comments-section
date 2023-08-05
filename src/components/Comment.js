// Comment.js
import React from 'react';

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.content}</p>
      <p>Score: {comment.score}</p>
      <p>Posted by: {comment.user.username}</p>
      <img src={comment.user.image.png} alt={comment.user.username} />
      {/* Buttons to upvote/downvote, edit and delete the comment */}
    </div>
  );
}

export default Comment;
