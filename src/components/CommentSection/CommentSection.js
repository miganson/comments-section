import React, { useState, useEffect, useRef, createRef } from "react";
import Comment from "../Comment/Comment";
import Reply from "../Reply/Reply";
import data from "../../data/data.json";
import "./CommentSection.css";

function CommentSection() {
  const savedComments = localStorage.getItem("comments");
  const initialComments = savedComments
    ? JSON.parse(savedComments)
    : data.comments;
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");

  // Create a ref for each comment reply input
  const replyRefs = useRef(comments.map(() => createRef()));

  useEffect(() => {
    // Save comments to localStorage whenever they change
    localStorage.setItem("comments", JSON.stringify(comments));

    // update refs
    replyRefs.current = replyRefs.current.slice(0, comments.length);
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
      {comments.map((comment, index) => (
        <div key={comment.id} className="comment-section">
          <Comment
            comment={comment}
            onUpvote={() => handleUpvoteComment(comment.id)}
            onDownvote={() => handleDownvoteComment(comment.id)}
            onDelete={handleDeleteComment}
            onReply={() => {
              // Smooth scroll to the reply input
              replyRefs.current[index].current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
          />
          <div className="replies-container">
            {comment.replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                onUpvote={() => handleUpvoteReply(comment.id, reply.id)}
                onDownvote={() => handleDownvoteReply(comment.id, reply.id)}
                onDelete={() => handleDeleteReply(comment.id, reply.id)}
              />
            ))}
            <input
              type="text"
              placeholder="Write a reply..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              ref={replyRefs.current[index]} // use ref here
            />
            <button onClick={() => handleAddReply(comment.id, newReply)}>
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
