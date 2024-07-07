import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Container,
  Box,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function AgentSignUp() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleBackClick = () => {
    navigate("/profile");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Application submitted");
    setSubmitted(true);
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
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#55AD9B",
            padding: "15px 20px",
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
            Sign Up As Agent
          </Typography>
        </Box>

        <Box sx={{ padding: "20px" }}>
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your application has been submitted successfully. We will review
              it and get back to you soon.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Business Address"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Why do you want to become an agent?"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                required
              />
              <FormControlLabel
                control={<Checkbox required />}
                label="I confirm that all information provided is accurate"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#55AD9B",
                  "&:hover": {
                    backgroundColor: "#458C7E",
                  },
                }}
              >
                Submit Application
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
