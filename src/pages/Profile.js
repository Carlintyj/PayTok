import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { Button, Paper, Avatar, Typography, Container } from "@mui/material";

/**
 * A component for displaying profile page UI (User Profile/ Edit Profile/ Change Password/ Delete Account)
 * @component
 * @returns {JSX.Element} Profile Page UI.
 */
export default function Profile() {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
    }
  }, []);

  const getImageURL = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.picture;
    }
  };

  const showWalletSettings = (JSON.parse(localStorage.getItem("user")).role === "agent");

  const navigate = useNavigate();

  const handleAccountDetailsClick = () => {
    navigate("/accountdetails");
  };

  const handleWalletSettingsClick = () => {
    navigate("/wallet");
  };

  const handleSupportFAQClick = () => {
    navigate("/support");
  };

  const handleReportClick = () => {
    navigate("/report");
  };

  const handleTermsClick = () => {
    navigate("/terms");
  };

  const handleLogout = () => {
    // Log out from Google
    googleLogout();
    
    // Remove user from localStorage
    localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), isAuth: false }));
    
    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
    
    // Navigate to login page
    window.location.reload();
    navigate("/");
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
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#55AD9B",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
          <Avatar
          sx={{
            width: 100,
            height: 100,
            marginBottom: "10px",
          }}
          src={getImageURL()}
        >
        </Avatar>
        <Typography variant="h5" gutterBottom sx={{ marginBottom: "10px", color: "#fff" }}>
          {name}
        </Typography>
      </Paper>

      <Button onClick={handleAccountDetailsClick}
      sx={{       
        width: "100%",
        color: "black",
        fontSize: 20
      }}   
      >Account Details</Button>
      {showWalletSettings && <Button onClick={handleWalletSettingsClick}
        sx={{       
          width: "100%",
          color: "black",
          fontSize: 20
        }}  
        >Wallet Settings</Button>}
      <Button onClick={handleSupportFAQClick} 
      sx={{       
        width: "100%",
        color: "black",
        fontSize: 20
      }}  
      >Support & FAQs</Button>
      <Button onClick={handleReportClick}
      sx={{       
        width: "100%",
        color: "black",
        fontSize: 20
      }}  >Report a problem</Button>
      <Button onClick={handleTermsClick}
      sx={{       
        width: "100%",
        color: "black",
        fontSize: 20
      }}  
      >Terms and Policies</Button>
      <Button onClick={handleLogout}
      sx={{       
        width: "100%",
        color: "black",
        fontSize: 20
      }}  
      >Logout</Button>
    </Container>
    
  );
}
