import React, { useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Report() {
  const navigate = useNavigate();
  const [reportText, setReportText] = useState("");

  const handleBackClick = () => {
    navigate("/profile");
  };

  const handleReportChange = (event) => {
    setReportText(event.target.value);
  };

  const handleSubmit = () => {
    if (!reportText.trim()) {
      alert("Please enter a report before submitting!");
      return;
    }
    console.log("Submitting report:", reportText);
    alert("Report has been submitted successfully!");
    // Send to backend
    setReportText("");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#55AD9B",
            padding: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleBackClick}
            sx={{ color: "#fff", marginRight: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: "#fff", flexGrow: 1 }}>
            Report an Issue
          </Typography>
        </Box>

        <Box sx={{ padding: "20px" }}>
          <Typography variant="body1" gutterBottom>
            Please describe the issue you're experiencing:
          </Typography>
          <TextField
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            placeholder="Enter your report here..."
            value={reportText}
            onChange={handleReportChange}
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#55AD9B",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#458B7B",
              },
              width: "100%",
            }}
          >
            Submit Report
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
