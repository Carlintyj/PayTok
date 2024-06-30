import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

const theme = createTheme();

export default function PaymentPage() {
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
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          '@media (max-width: 600px)': {
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
            '@media (max-width: 600px)': {
              padding: "20px",
              borderRadius: "15px",
            },
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 3,
            }}
          >
          </Avatar>
          <TextField
            label="ID"
            sx={{
              width: "100%",
              backgroundColor: "white",
              mb: 3,
            }}
          >
          </TextField>
          <Typography variant="body2" color="text.secondary" align="center">
            Please enter a valid user ID.
          </Typography>
        </Box>
        <TextField
          label="Enter amount"
          sx={{
            width: "15%",
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
          variant="contained"
          sx={{
            width: "10%",
            margin: 25,
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.dark" },
            mb: 3,
          }}
        >
          Pay
        </Button>
      </Container>
    </ThemeProvider>
  );
}
