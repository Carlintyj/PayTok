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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleKeypadClick(key)}
              >
                {key === "delete" ? (
                  <Typography variant="body1">←</Typography>
                ) : (
                  <Typography variant="body1">{key}</Typography>
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
  const defaultTheme = createTheme();
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = React.useState("");

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
    localStorage.setItem("user", JSON.stringify({ uid, email, name, account, role, picture, isAuth: false }));

    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
  };

  const handleCreatePin = () => {
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    updateUserPin(uid, enteredPin).then(() => {
      setOpenPinModal(false);
      localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), isAuth: true }));
    }).then(() => {
      navigate("/home");
      window.location.reload();
    });
  }

  const handleEnterPin = () => {
    const uid = JSON.parse(localStorage.getItem("user")).uid;
    checkPin(uid, enteredPin).then((result) => {
      if (result) {
        setOpenPinModal(false);
        localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), isAuth: true }));
        navigate("/home");
        window.location.reload();
      } else {
        alert("Incorrect PIN. Please try again.");
        setEnteredPin("");
      }
    });
  }

  const handleKeypadClick = (key) => {
    if (key === "delete") {
      setEnteredPin(enteredPin.slice(0, -1));
    } else if (enteredPin.length < 6) {
      setEnteredPin(enteredPin + key);
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isFirstLogin ? "Create PIN" : "Enter PIN"}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              {[...Array(6)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: enteredPin.length > index ? "#000" : "#ccc",
                    margin: "0 4px",
                  }}
                />
              ))}
            </Box>
            <TextField
              label="PIN"
              type="password"
              value={enteredPin}
              InputProps={{ disableUnderline: true }}
              sx={{ width: "100%", textAlign: "center", marginBottom: "20px" }}
            />
            <Keypad onKeypadClick={handleKeypadClick} />
            <Button
              variant="contained"
              fullWidth
              onClick={isFirstLogin ? handleCreatePin : handleEnterPin}
            >
              {isFirstLogin ? "Create PIN" : "Enter PIN"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
