import * as React from "react";
import { Button, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WalletSettings() {
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate("/profile");
    };
  
    return (
      <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
      }}
      >
            <Paper
            sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#55AD9B",
            padding: "20px",
            borderRadius: "10px",
            }}
        >
            <Typography variant="h5" gutterBottom sx={{ marginBottom: "10px", color: "#fff" }}>
            Wallet Settings
            </Typography>
        </Paper>
        <Button onClick={handleBackClick}>Back</Button>
        
      </Container>
    );
}