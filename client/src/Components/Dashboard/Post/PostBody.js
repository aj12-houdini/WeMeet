import React from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { makePost } from "../../../js/makePost";
import "../../../css/Dashboard/dashboard.css";

export default function PostBody() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    makePost(event);
  }

  return (
    <div className="create-post">
      <div className="create-post__card">
        <header className="create-post__header">
          <h1 className="create-post__title">Create a post</h1>
          <p className="create-post__subtitle">
            Share something with the people who follow you.
          </p>
        </header>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="post-title">
            <Form.Label className="create-post__label">Title</Form.Label>
            <Form.Control
              name="title"
              className="create-post__input"
              type="text"
              placeholder="Give your post a title"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="post-description">
            <Form.Label className="create-post__label">Content</Form.Label>
            <Form.Control
              name="description"
              className="create-post__input"
              as="textarea"
              rows={7}
              placeholder="What's on your mind?"
            />
          </Form.Group>

          <div className="create-post__actions">
            <Button
              type="button"
              variant="text"
              className="create-post__cancel"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              className="create-post__submit"
              disableElevation
            >
              Publish post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
