import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Container} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
    const navigate = useNavigate();

    const handleBackClick = () => {
      navigate("/profile");
    };

    const [name, setName] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setName(user.name);
      }
    }, []);

    const [account, setAccount] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setAccount(user.account);
      }
    }, []);

    const [email, setEmail] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setEmail(user.email);
      }
    }, []);

    const [role, setRole] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setRole(user.role);
      }
    }, []);

    const [pin, setPin] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setPin(user.role);
      }
    }, []);

    const handleChangePINClick = () => {
      navigate("/changepin");
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
            <Typography variant="h5" gutterBottom sx={{ marginBottom: "10px", color: "#fff" }}>
            Account Details
            </Typography>
        </Paper>
        
        <Typography variant="h5" align='left' >
          <strong> Username: </strong> {name}
        </Typography>
        <Typography variant="h5" align='left' >
          <strong> Role: </strong> {role}
        </Typography>
        <Typography variant="h5" align='left' >
          <strong> Account Number: </strong> {account}
        </Typography>
        <Typography variant="h5" align='left' >
          <strong> Email: </strong> {email}
        </Typography>
        <Typography variant="h5" align='left' >
          <strong> PIN: </strong> {pin}
        </Typography>

        <Button onClick={handleChangePINClick}
        sx={{       
          width: "100%",
          color: "black",
          fontSize: 20
        }}  
        >Change PIN</Button>
        
        <Button onClick={handleBackClick}>Back</Button>
      </Container>
    );
}