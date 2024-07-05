import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Container, Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Payment, Storefront, QrCode, ContentCopy } from "@mui/icons-material";
import TikTokLogo from "../assets/tiktok-store.jpg";
import { getBalance } from "../services/ProfileService";
import { set } from "mongoose";

export default function HomePage() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [isAgent, setIsAgent] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setName(user.name);
        setIsAgent(user.role === "agent");
        try {
          const balance = await getBalance(user.uid);
          setBalance(balance !== null ? balance : 0);
        } catch (error) {
          console.error("Failed to fetch balance", error);
          setBalance(0);
        }
      }
    };

    fetchBalance();
  }, []);

  const getAccount_id = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.account;
    }
    return "";
  }

  const handleCopyClick = () => {
    const accountId = getAccount_id();
    navigator.clipboard.writeText(accountId).then(() => {
      alert("Account ID copied to clipboard");
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const navigate = useNavigate();

  const handlePayPersonClick = () => {
    navigate("/payment");
  };

  const handlePayMerchantClick = () => {
    navigate("/payment");
  };

  const handleQRCodeClick = () => {
    // Navigate to QR code generation route
  };

  const handleTikTokStoreClick = () => {
    window.open("https://seller-sg.tiktok.com/", "_blank");
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
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#55AD9B",
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "10px", color: "#fff" }}>
          Welcome back, {name} {isAgent ? "(Agent)" : ""}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            borderRadius: "10px",
            border: 1,
            padding: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h6">
            Account ID: <span style={{ fontWeight: "bold" }}>{getAccount_id()}</span>
            <IconButton onClick={handleCopyClick}>
              <ContentCopy sx={{ fontSize: "16px" }}/>
            </IconButton>
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            PayTok Account Balance
          </Typography>
          <Typography variant="h4" sx={{ color: "#55AD9B", fontWeight: "bold" }}>
            ${balance.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          width="10%"
          onClick={handlePayPersonClick}
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Payment sx={{ fontSize: 32 }} />
          <Typography variant="button" sx={{ paddingTop: "5px" }}>
            Pay Person
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="primary"
          width="10%"
          onClick={handlePayMerchantClick}
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Storefront sx={{ fontSize: 32 }} />
          <Typography variant="button" sx={{ paddingTop: "5px" }}>
            Pay Store
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="primary"
          width="10%"
          onClick={handleQRCodeClick}
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <QrCode sx={{ fontSize: 32 }} />
          <Typography variant="button" sx={{ paddingTop: "5px" }}>
            QR Code
          </Typography>
        </Button>
      </Box>
      <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "95%",
          }}>
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "10px", textAlign: "left", fontWeight: "bold"}}>
        Discover
      </Typography>
      </Box>
      <Button onClick={handleTikTokStoreClick} sx={{ padding: 0 }}>
        <img src={TikTokLogo} alt="TikTok Store" style={{ width: "100%",  cursor: "pointer", borderRadius: "20px" }} />
      </Button>
    </Container>
  );
}
