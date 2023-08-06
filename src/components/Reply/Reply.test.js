import React from "react";
import { render, screen } from "@testing-library/react";
import Reply from "./Reply";

test("renders reply details", () => {
  const reply = {
    id: "1",
    content: "This is a reply",
    createdAt: new Date().toISOString(),
    score: 5,
    user: {
      username: "yoda",
      image: { png: "avatars/yoda.png" },
    },
  };
  render(
    <Reply
      reply={reply}
      onUpvote={() => {}}
      onDownvote={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText("This is a reply")).toBeInTheDocument();
});
