import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import data from "./../data/data.json";

function CommentSection() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(data.comments);
  }, []);

  // Other functions to handle CRUD operations...

  return (
    <div>
      {comments
        .sort((a, b) => b.score - a.score)
        .map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} />
            {comment.replies.map((reply) => (
              <Reply key={reply.id} reply={reply} />
            ))}
          </div>
        ))}
    </div>
  );
}

export default CommentSection;
