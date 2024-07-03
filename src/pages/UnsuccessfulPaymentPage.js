import * as React from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UnsuccessfulPaymentPage() {
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
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
      }}
    >
      <Typography variant="h5" sx={{alignContent: "center", marginTop:"300px", color: "#000000", fontWeight: "bold"}}>
        Payment unsuccessful.
      </Typography>
      <Typography variant="h5" sx={{alignContent: "center", color: "#000000", fontWeight: "bold"}}>
        Please try again.
      </Typography>
      <Button
        onClick={handleHomeClick}
        variant="contained"
        gutterBottom
        sx={{color:"#ffffff", marginTop: "100px", marginBottom: "20px", fontWeight: "bold", backgroundColor: "#55AD9B", "&:hover": { backgroundColor: "#55AD9B"}}}
      >
        Return Home
      </Button>
    </Container>
  );
}