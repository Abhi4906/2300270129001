import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import sendLog from "../middleware/logger";

function URLCard({ item }) {
  const shortURL = `${window.location.origin}/${item.shortcode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
    sendLog("ui", "info", `Copied short URL: ${shortURL}`);
    alert("Copied to clipboard!");
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography><strong>Original:</strong> {item.url}</Typography>
        <Typography>
          <strong>Short:</strong> {shortURL}
        </Typography>
        <Typography><strong>Expires in:</strong> {item.expiry} mins</Typography>
        <Button variant="outlined" onClick={handleCopy}>Copy</Button>
      </CardContent>
    </Card>
  );
}

export default URLCard;
