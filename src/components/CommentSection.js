import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import data from "./../data/data.json";

function CommentSection() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(data.comments);
  }, []);

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      )
    );
  };

  return (
    <div>
      {comments
        .sort((a, b) => b.score - a.score)
        .map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} onDelete={handleDeleteComment} />
            {comment.replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                onDelete={() => handleDeleteReply(comment.id, reply.id)}
              />
            ))}
          </div>
        ))}
    </div>
  );
}

export default CommentSection;
