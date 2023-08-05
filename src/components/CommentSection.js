import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import data from "./../data/data.json";

function CommentSection() {
  // Load comments from localStorage or use default data
  const savedComments = localStorage.getItem("comments");
  const initialComments = savedComments
    ? JSON.parse(savedComments)
    : data.comments;
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    // Save comments to localStorage whenever they change
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

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

  const handleUpvoteComment = (id) => {
    console.log("Upvoting comment with ID:", id);
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score + 1 } : comment
      )
    );
  };

  const handleDownvoteComment = (id) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, score: comment.score - 1 } : comment
      )
    );
  };

  const handleUpvoteReply = (commentId, replyId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, score: reply.score + 1 }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  const handleDownvoteReply = (commentId, replyId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, score: reply.score - 1 }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            onUpvote={() => handleUpvoteComment(comment.id)}
            onDownvote={() => handleDownvoteComment(comment.id)}
            onDelete={handleDeleteComment}
          />
          {comment.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onUpvote={() => handleUpvoteReply(comment.id, reply.id)}
              onDownvote={() => handleDownvoteReply(comment.id, reply.id)}
              onDelete={() => handleDeleteReply(comment.id, reply.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
