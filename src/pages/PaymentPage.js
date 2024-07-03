import * as React from "react";
import { Button, Paper, TextField, InputAdornment, Avatar, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  const handlePayClick = () => {
    // TODO: Replace with actual balance retrieval logic
    if(true) {
      navigate("/successfulPayment");
    }
    else navigate("/unsuccessfulPayment");
  };

  return (
    <Container
      component="main"
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
        <Avatar
          sx={{
            width: 100,
            height: 100,
            marginBottom: "10px",
          }}
        >
        </Avatar>
        <TextField
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            borderRadius: "10px",
            border: 1,
            backgroundColor: "#ffffff",
            marginBottom: "10px",
          }}
        >
        </TextField>
        <Typography variant="h5" sx={{color: "#fff"}}>
          Please enter a valid user ID.
        </Typography>
      </Paper>
      <TextField
        label="Enter amount"
        sx={{
          width: "50%",
          size: "medium",
          margin: 25,
          backgroundColor: "white",
          mb: 3,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      >
      </TextField>
      <Button
        onClick={handlePayClick}
        variant="contained"
        gutterBottom
        sx={{color:"#ffffff", marginTop: "100px", marginBottom: "20px", fontWeight: "bold", backgroundColor: "#55AD9B", "&:hover": { backgroundColor: "#55AD9B"}}}
      >
        Pay
      </Button>
    </Container>
  );
}
