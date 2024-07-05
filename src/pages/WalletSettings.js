import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  Container,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "@mui/icons-material";
import  { topup } from "../services/PaymentService"; 

export default function WalletSettings() {

  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAccount(user.account);
    }
  }, []);

  const handleCardChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Only allow numbers
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    setCard(formattedValue.slice(0, 19)); // Limit to 16 digits with spaces
  };

  const handleExpChange = (event) => {
    setExp(event.target.value);
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Only allow numbers
    setCvv(value.slice(0, 3)); // Limit to 3 digits
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO: Add card logic here
    topup(8268014734, account, 1000).then((response) => {
      if (response) {
        alert("Top up successful!");
      } else {
        alert("Top up failed!");
      }
    });
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
          <Typography variant="h5" sx={{ color: "#fff", flexGrow: 1 }}>
            Top Up with Credit Card
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            onChange={handleCardChange}
            required
            label="Card Number"
            value={card}
            variant="outlined"
            inputProps={{
              maxLength: 19, // Limit to 16 digits with spaces
              pattern: "[0-9 ]*",
            }}
            InputProps={{
              startAdornment: <CreditCard color="primary" />,
            }}
          />

          <TextField
            onChange={handleExpChange}
            required
            label="Expiry Date (MM/YY)"
            value={exp}
            variant="outlined"
            inputProps={{
              maxLength: 5, // Limit to MM/YY format
              pattern: "[0-9]*",
            }}
          />

          <TextField
            onChange={handleCvvChange}
            required
            label="CVV (3 digits)"
            value={cvv}
            variant="outlined"
            inputProps={{
              maxLength: 3,
              pattern: "[0-9]*",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#55AD9B",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#458B7B",
              },
            }}
          >
            Top Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
