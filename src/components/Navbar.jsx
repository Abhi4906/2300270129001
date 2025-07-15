import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
          URL Shortener App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Shortener</Button>
        <Button color="inherit" onClick={() => navigate("/stats")}>Stats</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
