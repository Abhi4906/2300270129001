import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sendLog from "../middleware/logger";

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem("shortLinks")) || [];
    const match = links.find((link) => link.shortcode === shortcode);

    if (match) {
      sendLog("redirect", "info", `Redirecting to ${match.url}`);
      window.location.href = match.url;
    } else {
      sendLog("redirect", "error", `Invalid shortcode: ${shortcode}`);
      alert("Shortcode not found. Redirecting to Home.");
      navigate("/");
    }
  }, [shortcode, navigate]);

  return null;
}

export default RedirectPage;
