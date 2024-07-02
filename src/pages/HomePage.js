import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountBalance, Payment } from "@mui/icons-material";

export default function HomePage() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0); // Replace with actual balance retrieval logic

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
    }
    // Simulating balance retrieval, replace with actual logic
    setBalance(500.00);
  }, []);

  const navigate = useNavigate();

  const handlePayClick = () => {
    navigate("/pay");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
       <Typography variant="h5" gutterBottom sx={{padding: "10px"}}>
          Hi, {name}
        </Typography>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
        }}
      >
       
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            width: "100%",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Balance
          </Typography>
          <Typography variant="h4">
            ${balance.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePayClick}
          sx={{
            backgroundColor: "#4caf50",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
        >
          <Payment sx={{ fontSize: 32 }} />
        </Button>
      </Paper>
    </Container>
  );
}
