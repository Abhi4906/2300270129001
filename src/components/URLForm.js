import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import sendLog from "../middleware/logger";

function URLForm({ onAddURL }) {
  const [urls, setUrls] = useState([{ url: "", shortcode: "", expiry: "" }]);

  const handleChange = (index, key, value) => {
    const newUrls = [...urls];
    newUrls[index][key] = value;
    setUrls(newUrls);
  };

  const handleSubmit = () => {
    const validLinks = urls
      .filter((u) => u.url.trim() !== "")
      .slice(0, 5)
      .map((u) => ({
        ...u,
        expiry: parseInt(u.expiry) || 30,
        shortcode:
          u.shortcode.trim() || Math.random().toString(36).substr(2, 5),
      }));

    if (validLinks.length === 0) {
      sendLog("validation", "error", "No valid URLs entered");
      alert("Please enter at least one valid URL.");
      return;
    }

    sendLog("form", "info", `User submitted ${validLinks.length} URL(s)`);

    onAddURL(validLinks);
    setUrls([{ url: "", shortcode: "", expiry: "" }]);
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6">Enter up to 5 URLs</Typography>
      {urls.map((u, idx) => (
        <Box key={idx} my={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Original URL"
                fullWidth
                value={u.url}
                onChange={(e) => handleChange(idx, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Expiry (min)"
                type="number"
                fullWidth
                value={u.expiry}
                onChange={(e) => handleChange(idx, "expiry", e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={u.shortcode}
                onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>
    </Paper>
  );
}

export default URLForm;
