import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import background from "../assets/background.jpg";
import Container from "@mui/material/Container";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 

const { login } = require('../services/ProfileService');

export default function LoginPage() {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const handleGoogleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Decoded user info:", decoded);
    const { email, name, sub } = decoded;
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("ID:", sub);
    
    // Store user info in localStorage
    localStorage.setItem("user", JSON.stringify({ email, name }));

    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));

    // Navigate to home after successful login
    navigate("/home");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: "0 20px",
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          "@media (max-width: 600px)": {
            backgroundPosition: "top",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: 3,
            "@media (max-width: 600px)": {
              padding: "20px",
              borderRadius: "15px",
            },
          }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={(error) => console.log(error)}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            style={{ marginTop: "20px" }}
          >
            PayTok helps you pay without cards with ease
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
