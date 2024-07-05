import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { Button, Paper, Avatar, Typography, Container, Divider, Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportIcon from '@mui/icons-material/HelpOutline';
import ReportIcon from '@mui/icons-material/Report';
import TermsIcon from '@mui/icons-material/Gavel';

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
          marginBottom: "20px",
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            marginBottom: "10px",
          }}
          src={getImageURL()}
        />
        <Typography variant="h5" sx={{ marginBottom: "10px", color: "#fff" }}>
          {name}
        </Typography>
      </Paper>

      <Paper
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: 3,
        }}
      >
        <Button 
          onClick={handleAccountDetailsClick}
          startIcon={<AccountCircleIcon />}
          sx={{       
            width: "100%",
            color: "black",
            fontSize: 20,
            justifyContent: 'flex-start',
            padding: '10px 20px',
            borderBottom: '1px solid #ccc',
            borderRadius: '10px 10px 0 0',
          }}   
        >
          Account Details
        </Button>
        <Button 
          onClick={handleSupportFAQClick}
          startIcon={<SupportIcon />}
          sx={{       
            width: "100%",
            color: "black",
            fontSize: 20,
            justifyContent: 'flex-start',
            padding: '10px 20px',
            borderBottom: '1px solid #ccc',
          }}  
        >
          Support & FAQs
        </Button>
        <Button 
          onClick={handleReportClick}
          startIcon={<ReportIcon />}
          sx={{       
            width: "100%",
            color: "black",
            fontSize: 20,
            justifyContent: 'flex-start',
            padding: '10px 20px',
            borderBottom: '1px solid #ccc',
          }}  
        >
          Report an Issue
        </Button>
        <Button 
          onClick={handleTermsClick}
          startIcon={<TermsIcon />}
          sx={{       
            width: "100%",
            color: "black",
            fontSize: 20,
            justifyContent: 'flex-start',
            padding: '10px 20px',
            borderRadius: '0 0 10px 10px',
          }}  
        >
          Terms and Policies
        </Button>
      </Paper>
      
      <Divider sx={{ width: '100%', margin: '20px 0' }} />
      
      <Button 
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{       
          width: "100%",
          color: "white",
          backgroundColor: "#FF5252",
          fontSize: 20,
          justifyContent: 'flex-start',
          padding: '10px 20px',
          '&:hover': {
            backgroundColor: "#FF1744",
          },
        }}  
      >
        Logout
      </Button>
    </Container>
  );
}
