import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import background from "../assets/background.jpg";
import Container from "@mui/material/Container";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

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
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
              mb: 3,
            }}
            onClick={() => navigate("/home")}
          >
            Login with Google
          </Button>
          <Typography variant="subtitle1" gutterBottom>
            Or continue with
          </Typography>
          <GoogleLogin
            onSuccess={() => navigate("/home")}
            onError={(error) => console.log(error)}
          />
          <Typography variant="body2" color="text.secondary" align="center">
            PayTok helps you pay without cards with ease
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
