import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../../css/Nav/nav.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "";

  function goTo(path) {
    return (event) => {
      event.preventDefault();
      navigate(path);
    };
  }

  return (
    <Navbar id="navbar" className="app-navbar" bg="dark" data-bs-theme="dark">
      <Container className="app-navbar__inner">
        <Navbar.Brand
          href="/dashboard"
          onClick={goTo("/dashboard")}
          className="app-navbar__brand"
        >
          <span className="app-navbar__logo" aria-hidden="true">
            O
          </span>
          OurApp
        </Navbar.Brand>

        <div className="app-navbar__actions">
          <Tooltip title="Search">
            <IconButton className="app-navbar__icon" aria-label="Search">
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Messages">
            <IconButton className="app-navbar__icon" aria-label="Messages">
              <ModeCommentIcon />
            </IconButton>
          </Tooltip>

          <Button
            onClick={goTo("/dashboard/posts")}
            variant="contained"
            startIcon={<AddIcon />}
            className="app-navbar__create"
            disableElevation
          >
            <span className="create-label">Create post</span>
          </Button>

          <a
            href="/dashboard/profile"
            onClick={goTo("/dashboard/profile")}
            className="app-navbar__user"
            title="Your profile"
          >
            <span className="app-navbar__avatar">
              {username.slice(0, 1).toUpperCase()}
            </span>
            <span className="app-navbar__username">{username}</span>
          </a>

          <Tooltip title="Log out">
            <IconButton className="app-navbar__icon" aria-label="Log out">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
