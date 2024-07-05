import * as React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function SuccessfulPaymentPage({amount, recipientName}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
      }}
    >
      <CheckCircleOutlineIcon sx={{fontSize: "200px", color: "#55AD9B"}}/>
      <Typography variant="h5" sx={{alignContent: "center", marginTop: "20px", fontWeight: "bold"}}>
        Payment successful!
      </Typography>
      <Typography variant="h6" sx={{alignContent: "center", marginTop: "20px"}}>
        You have successfully sent ${amount} to {recipientName}.
        </Typography>
      <Button
        onClick={handleHomeClick}
        variant="contained"
        gutterBottom
        sx={{color:"#ffffff", marginTop: "100px", marginBottom: "20px", fontWeight: "bold", backgroundColor: "#55AD9B", "&:hover": { backgroundColor: "#55AD9B"}}}
      >
        Back to Home
      </Button>
    </Container>
  );
}