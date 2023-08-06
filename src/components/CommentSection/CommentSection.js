import React, { useState, useEffect, useRef, createRef } from "react";
import Comment from "../Comment/Comment";
import Reply from "../Reply/Reply";
import ConfirmationModal from "../modal/ConfirmationModal";
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
  const [replyTo, setReplyTo] = useState(null);

  // New state for modal and item to delete
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const replyRefs = useRef(comments.map(() => createRef()));

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    replyRefs.current = replyRefs.current.slice(0, comments.length);
  }, [comments]);

  const handleDeleteComment = (id) => {
    setShowModal(true);
    setItemToDelete({ type: "comment", id });
  };

  const handleDeleteReply = (commentId, replyId) => {
    setShowModal(true);
    setItemToDelete({ type: "reply", commentId, replyId });
  };

  const confirmDelete = () => {
    if (itemToDelete.type === "comment") {
      setComments(comments.filter((comment) => comment.id !== itemToDelete.id));
    } else if (itemToDelete.type === "reply") {
      setComments(
        comments.map((comment) =>
          comment.id === itemToDelete.commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== itemToDelete.replyId
                ),
              }
            : comment
        )
      );
    }

    setShowModal(false);
    setItemToDelete(null);
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
    setReplyTo(null);
    setNewReply("");
  };

  const handleAddComment = (content) => {
    setComments([
      ...comments,
      {
        id: Date.now(),
        content,
        createdAt: new Date().toISOString(),
        score: 0,
        user: data.currentUser,
        replies: [],
      },
    ]);
    setNewComment("");
  };

  return (
    <div className="comment-section-container">
      {comments.map((comment, index) => (
        <div key={comment.id} className="comment-section">
          <Comment
            comment={comment}
            onUpvote={() => handleUpvoteComment(comment.id)}
            onDownvote={() => handleDownvoteComment(comment.id)}
            onDelete={() => handleDeleteComment(comment.id)}
            onReply={() => {
              setReplyTo(comment.id);
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
            {replyTo === comment.id && (
              <div className="comment-input-container">
                <div className="new-comment-container">
                  <img
                    src={
                      data.currentUser.image
                        ? data.currentUser.image.png
                        : "avatars/anon.png"
                    }
                    alt={data.currentUser.username || "Anonymous"}
                    className="comment-user-image"
                  />
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    ref={replyRefs.current[index]}
                  />
                  <button
                    className="comment-btn"
                    onClick={() => handleAddReply(comment.id, newReply)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="comment-input-container">
        <div className="new-comment-container">
          <img
            src={
              data.currentUser.image
                ? data.currentUser.image.png
                : "avatars/anon.png"
            }
            alt={data.currentUser.username || "Anonymous"}
            className="comment-user-image"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="comment-btn"
            onClick={() => handleAddComment(newComment)}
          >
            Send
          </button>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default CommentSection;
