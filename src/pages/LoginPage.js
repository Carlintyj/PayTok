import * as React from "react";
import { useState } from "react";
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
import { login, checkPin, isPinExist } from "../services/ProfileService";
import { updateUserPin } from "../services/UserService";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen"; // Added unlock icon
import BackspaceIcon from '@mui/icons-material/Backspace';

const Keypad = ({ onKeypadClick }) => {
  const keypadLayout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["", 0, "delete"],
  ];

  const handleKeypadClick = (key) => {
    onKeypadClick(key);
  };

  return (
    <Grid container spacing={1}>
      {keypadLayout.map((row, rowIndex) => (
        <Grid key={rowIndex} container item xs={12} justifyContent="center">
          {row.map((key, index) => (
            <Grid key={index} item>
              <Paper
                variant="outlined"
                sx={{
                  width: 70,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  backgroundColor: "#f7f7f7",
                  border: "1px solid #ddd",
                  borderRadius: "50%", // Make the button circular
                }}
                onClick={() => handleKeypadClick(key)}
              >
                {key === "delete" ? (
                  <BackspaceIcon />
                ) : (
                  <Typography variant="h6">{key}</Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const defaultTheme = createTheme();
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false); // State for unlock animation

  const handleGoogleLoginSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    const { email, name, sub, picture } = decoded;

    const { role, account } = await login(sub, name, email);
    const uid = sub;

    // Check if PIN exists for the user
    const pinExists = await isPinExist(uid);
    setIsFirstLogin(!pinExists);
    setOpenPinModal(true);

    // Store user info in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid,
        email,
        name,
        account,
        role,
        picture,
        isAuth: false,
      })
    );

    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
  };

  const handleCreatePin = async (pin) => {
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    await updateUserPin(uid, pin);
    setOpenPinModal(false);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("user")),
        isAuth: true,
      })
    );
    navigate("/home");
    window.location.reload();
  };

  const handleEnterPin = async (pin) => {
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    const result = await checkPin(uid, pin);
    if (result) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("user")),
          isAuth: true,
        })
      );
      setIsUnlocked(true); // Trigger unlock animation
      setTimeout(() => {
        navigate("/home");
        window.location.reload();
      }, 1000); // Reset unlock after 1 second
    } else {
      setError("Incorrect PIN. Please try again.");
      setEnteredPin("");
    }
  };

  const handleKeypadClick = (key) => {
    if (key === "delete") {
      setEnteredPin(enteredPin.slice(0, -1));
    } else if (enteredPin.length < 6) {
      const newPin = enteredPin + key;
      setEnteredPin(newPin);
      if (newPin.length === 6) {
        if (isFirstLogin) {
          handleCreatePin(newPin);
        } else {
          handleEnterPin(newPin);
        }
      }
    }
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
      <Modal
        open={openPinModal}
        onClose={() => setOpenPinModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: 4,
              boxShadow: 3,
              p: 3,
              textAlign: "center",
            }}
          >
            {isUnlocked ? (
              <LockOpenIcon sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} /> // Unlock animation
            ) : (
              <LockIcon sx={{ fontSize: 60, color: "#3f51b5", mb: 2 }} />
            )}
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              {isFirstLogin ? "Create PIN" : "Enter PIN"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                {[...Array(6)].map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor:
                        enteredPin.length > index ? "#000" : "#ccc",
                      margin: "0 8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: 20 }}>
                      {enteredPin.length > index ? "•" : ""}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="body2" color="error" marginBottom={"10px"}>{error}</Typography>
              <Keypad onKeypadClick={handleKeypadClick} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
