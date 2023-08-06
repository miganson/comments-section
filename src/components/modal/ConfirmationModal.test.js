import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ConfirmationModal from "./ConfirmationModal";

test("renders modal with confirmation message", () => {
  render(
    <ConfirmationModal show={true} onConfirm={() => {}} onCancel={() => {}} />
  );
  expect(
    screen.getByText(
      "Are you sure you want to delete this comment? This will remove the comment and cannot be undone."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("YES, DELETE")).toBeInTheDocument();
  expect(screen.getByText("NO, CANCEL")).toBeInTheDocument();
});

test("handle confirm action", () => {
  const handleConfirm = jest.fn();
  render(
    <ConfirmationModal
      show={true}
      onConfirm={handleConfirm}
      onCancel={() => {}}
    />
  );
  fireEvent.click(screen.getByText("YES, DELETE"));
  expect(handleConfirm).toHaveBeenCalledTimes(1);
});

test("handle cancel action", () => {
  const handleCancel = jest.fn();
  render(
    <ConfirmationModal
      show={true}
      onConfirm={() => {}}
      onCancel={handleCancel}
    />
  );
  fireEvent.click(screen.getByText("NO, CANCEL"));
  expect(handleCancel).toHaveBeenCalledTimes(1);
});
