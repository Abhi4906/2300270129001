import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import sendLog from "../middleware/logger";

function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("shortLinks")) || [];
    setData(items);
    sendLog("ui", "info", "Statistics page loaded");
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Shortcode</TableCell>
            <TableCell>Expiry</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.url}</TableCell>
              <TableCell>{item.shortcode}</TableCell>
              <TableCell>{item.expiry} mins</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default Stats;
