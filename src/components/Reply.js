// Reply.js
import React from 'react';

function Reply({ reply }) {
  return (
    <div>
      <p>{reply.content}</p>
      <p>Score: {reply.score}</p>
      <p>Replying to: {reply.replyingTo}</p>
      <p>Posted by: {reply.user.username}</p>
      <img src={reply.user.image.png} alt={reply.user.username} />
      {/* Buttons to upvote/downvote, edit and delete the reply */}
    </div>
  );
}

export default Reply;
