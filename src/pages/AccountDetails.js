import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ContentCopy } from "@mui/icons-material";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleBackClick = () => {
    navigate("/profile");
  };

  const handleChangePINClick = () => {
    navigate("/changepin");
  };

  const getImageURL = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.picture;
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(user.account);
    alert("Account number copied to clipboard!");
  };


  const DetailItem = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{ fontWeight: "bold" }}
      >
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );

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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#55AD9B",
            padding: "20px",
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
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#fff", flexGrow: 1 }}
          >
            <strong>Account Details</strong>
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginBottom: "10px",
            }}
            src={getImageURL()}
          ></Avatar>
        </Box>
        <Box sx={{ padding: "10px", width: "95%" }}>
          <DetailItem label="Name" value={user.name} />
          <DetailItem label="Role" value={user.role} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DetailItem label="Account Number" value={user.account} />
            <IconButton onClick={handleCopyClick} sx={{ ml: -2 }}>
              <ContentCopy sx={{ fontSize: "16px" }} />
            </IconButton>
          </Box>
          <DetailItem label="Email" value={user.email} />

          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={handleChangePINClick}
            sx={{
              mt: 1,
              backgroundColor: "#55AD9B",
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
