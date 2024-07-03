import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

export default function SuccessfulPaymentPage() {
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
        Payment successful!
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