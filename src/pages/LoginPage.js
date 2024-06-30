import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container
        component="main"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        maxWidth="xxl"
      >
        <Box
          sx={{
            backgroundColor: "white",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px",
            borderRadius: "20px",
            opacity: "0.9",
          }}
        >
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQARgGY3EkcJpeHelGAgFz3GSJWkd7_pn4gQ&s"
            }
            alt="PayTok Logo"
            style={{ height: "100px" }}
          />
          <Box component="form" noValidate sx={{ mt: 1 }} width={300}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Typography color="error">{errorMessage}</Typography>
            <Box align="end">
              <Link variant="body2" onClick={() => navigate("/forgotpassword")}>
                Forgotten password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 1,
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
              }}
              onClick={() => {
                if (email === "" || password === "") {
                  setErrorMessage("Please fill all fields");
                } else {
                  setErrorMessage("");
                  navigate("/home");
                }
              }}
            >
              Sign In
            </Button>
            <Box
              sx={{
                pb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Or continue with
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.main",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                >
                  TikTok
                </Button>
              </Typography>
            </Box>
            <Box align="end">
              <Link variant="body2" onClick={() => navigate("/signup")}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
            <Box mt={1}>
              <Typography variant="body2" color="text.secondary" align="center">
                PayTok helps you pay without cards at ease
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
