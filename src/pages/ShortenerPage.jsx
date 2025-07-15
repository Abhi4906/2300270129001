import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import sendLog from "../middleware/logger";

const ShortenerPage = () => {
  const [urlInputs, setUrlInputs] = useState([
    { url: "", validity: "", shortcode: "" },
  ]);

  const [results, setResults] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newInputs = [...urlInputs];
    newInputs[index][name] = value;
    setUrlInputs(newInputs);
  };

  const handleAddInput = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendLog("frontend", "info", "Submitted URLs for shortening");

    const shortened = urlInputs.map((entry, i) => ({
      original: entry.url,
      short: `https://short.ly/${entry.shortcode || "code" + (i + 1)}`,
      expiry: entry.validity ? `${entry.validity} mins` : "30 mins",
    }));

    setResults(shortened);
    setUrlInputs([{ url: "", validity: "", shortcode: "" }]);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {urlInputs.map((input, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  URL #{index + 1}
                </Typography>
                <TextField
                  label="Original URL"
                  name="url"
                  value={input.url}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Validity (minutes)"
                  name="validity"
                  value={input.validity}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                  type="number"
                />
                <TextField
                  label="Custom Shortcode (optional)"
                  name="shortcode"
                  value={input.shortcode}
                  onChange={(e) => handleChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Paper>
            </Grid>
          ))}

          {urlInputs.length < 5 && (
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleAddInput}>
                + Add another URL
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Submit All URLs
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <Box mt={5}>
          <Divider />
          <Typography variant="h5" gutterBottom mt={3}>
            Shortened URLs:
          </Typography>
          {results.map((res, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography>
                <strong>Original:</strong> {res.original}
              </Typography>
              <Typography>
                <strong>Short:</strong>{" "}
                <a href={res.short} target="_blank" rel="noopener noreferrer">
                  {res.short}
                </a>
              </Typography>
              <Typography>
                <strong>Expires in:</strong> {res.expiry}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShortenerPage;
