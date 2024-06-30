import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import NotFoundImage from "../assets/Logo.png"; 

const theme = createTheme();

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
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
          textAlign: "center",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        }}
      >
        <img
          src={NotFoundImage}
          alt="404 Not Found"
          style={{ width: "80%", maxWidth: "300px", marginBottom: "20px" }}
        />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
