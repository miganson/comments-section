import React, { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import Reply from "../Reply/Reply";
import data from "../../data/data.json";
import "./CommentSection.css";

function CommentSection() {
  // Load comments from localStorage or use default data
  const savedComments = localStorage.getItem("comments");
  const initialComments = savedComments
    ? JSON.parse(savedComments)
    : data.comments;
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");

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

  const handleAddComment = (content) => {
    setComments([
      ...comments,
      {
        id: Date.now(), // Unique ID
        content,
        createdAt: Date.now(),
        score: 0,
        user: data.currentUser, // Assuming data.json contains the current user
        replies: [],
      },
    ]);
  };

  const handleAddReply = (commentId, content) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  content,
                  createdAt: new Date().toISOString(),
                  score: 0,
                  replyingTo: comment.user.username,
                  user: data.currentUser,
                },
              ],
            }
          : comment
      )
    );
  };

  return (
    <div className="comment-section-container">
      <div>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => handleAddComment(newComment)}>Post</button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-section">
          <Comment
            comment={comment}
            onUpvote={() => handleUpvoteComment(comment.id)}
            onDownvote={() => handleDownvoteComment(comment.id)}
            onDelete={handleDeleteComment}
          />
          <div className="replies-container">
            <input
              type="text"
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <button onClick={() => handleAddReply(comment.id, newReply)}>
              Reply
            </button>
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
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
