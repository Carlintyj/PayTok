import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Container, FormGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function WalletSettings() {
    const navigate = useNavigate();

    const [card, setCard] = useState("");
    const [exp, setExp] = useState("");
    const [cvv, setCvv] = useState("");

    const handleCardChange = () => {
        setCard(card)
    };

    const handleExpChange = () => {
        setExp(exp)
    };

    const handleCvvChange = () => {
        setCvv(cvv)
    };

    const handleSubmit = () => {

  };

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

        <form onSubmit={handleSubmit}>
            <FormGroup>
                <TextField onChange={handleCardChange}
                required
                label="Card Number"
                defaultValue={card}
                sx={{margin:"10px"}}
                />
            
            </FormGroup>

            <FormGroup>
                <TextField onChange={handleExpChange}
                required
                label="Expiry Date (MM/YY)"
                defaultValue={exp}
                sx={{margin:"10px"}}
                />
            
            

                <TextField onChange={handleCvvChange}
                required
                label="CVV (3 digits)"
                defaultValue={cvv}
                sx={{margin:"10px"}}
                />
            </FormGroup>
            
            <FormGroup>
                <Button type="submit"
                sx={{margin:"10px"}}>Add Card</Button>
            </FormGroup>
            

        </form>

        <Button onClick={handleBackClick}>Back</Button>
        
      </Container>
    );
}