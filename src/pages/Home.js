import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import URLForm from "../components/URLForm";
import URLCard from "../components/URLCard";
import sendLog from "../middleware/logger";

function Home() {
  const [shortLinks, setShortLinks] = useState(() => {
    const saved = localStorage.getItem("shortLinks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAddURL = (newLinks) => {
    const combined = [...newLinks, ...shortLinks];
    localStorage.setItem("shortLinks", JSON.stringify(combined));
    setShortLinks(combined);
    sendLog("form", "info", "Short links updated in localStorage");
  };

  return (
    <Container>
      <Typography variant="h4" mt={4}>Shorten Your URLs</Typography>
      <URLForm onAddURL={handleAddURL} />
      {shortLinks.map((item, i) => (
        <URLCard key={i} item={item} />
      ))}
    </Container>
  );
}

export default Home;
