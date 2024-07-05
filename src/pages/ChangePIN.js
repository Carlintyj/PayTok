import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { checkPin, changePin } from "../services/ProfileService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function ChangePIN() {
  const navigate = useNavigate();

  const [uid, setUID] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUID(user.uid);
    }
  }, []);

  const [oldpin, setOldpin] = useState("");
  const [newpin, setNewpin] = useState("");
  const [cnewpin, setCnewpin] = useState("");
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showCnewPin, setShowCnewPin] = useState(false);

  const handleOldChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setOldpin(value);
    }
  };

  const handleNewChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setNewpin(value);
    }
  };

  const handleCnewChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setCnewpin(value);
    }
  };

  const handleBackClick = () => {
    navigate("/accountdetails");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newpin !== cnewpin) {
      alert("New PIN and Confirm PIN do not match.");
    } else if (!checkPin(uid, oldpin)) {
      alert("Old PIN is incorrect.");
    } else if (newpin.length !== 6) {
      alert("New PIN must be 6 digits.");
    } else {
      changePin(uid, oldpin, newpin).then((result) => {
        if (result) {
          alert("PIN changed successfully.");
          setOldpin("");
          setNewpin("");
          setCnewpin("");
        } else {
          alert("Failed to change PIN. Please try again.");
        }
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#55AD9B",
            padding: "15px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleBackClick}
            sx={{ color: "#fff", marginRight: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: "#fff", flexGrow: 1 }}>
            Change PIN
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            onChange={handleOldChange}
            required
            label="Old PIN"
            value={oldpin}
            variant="outlined"
            type={showOldPin ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPin(!showOldPin)}
                    edge="end"
                  >
                    {showOldPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            onChange={handleNewChange}
            required
            label="New PIN"
            value={newpin}
            variant="outlined"
            type={showNewPin ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPin(!showNewPin)}
                    edge="end"
                  >
                    {showNewPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            onChange={handleCnewChange}
            required
            label="Confirm New PIN"
            value={cnewpin}
            variant="outlined"
            type={showCnewPin ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCnewPin(!showCnewPin)}
                    edge="end"
                  >
                    {showCnewPin ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#55AD9B",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#458B7B",
              },
            }}
          >
            Change PIN
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
