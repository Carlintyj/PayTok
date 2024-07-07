import React, { useState, useEffect } from "react";
import { getUserByAccount } from "../services/UserService";
import { Button, Typography, Box, Modal, Fade, Paper } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import Logo from "../assets/Logo.png";

export default function TransactionHistoryCard({ amount, receiver_acc, sender_acc, type, timestamp }) {
  const [otherPartyName, setOtherPartyName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const account_id = JSON.parse(localStorage.getItem("user"))?.account;

  useEffect(() => {
    const getOtherPartyName = async () => {
      const account_id = JSON.parse(localStorage.getItem("user"))?.account;
      const response = await getUserByAccount(account_id === sender_acc ? receiver_acc : sender_acc);
      if (response) {
        setOtherPartyName(response.username);
      }
    };
    getOtherPartyName();
  }, [sender_acc, receiver_acc]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Function to format timestamp to DD MMM YYYY
  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        backgroundColor: "#fff",
        marginBottom: "10px",
        padding: "20px",
        borderRadius: "10px 10px 0 0",
        boxShadow: 2,
        position: "relative",
      }}
    >
      <Typography variant="h6">{formatDate(timestamp)}</Typography>
      <Typography variant="body1">{otherPartyName}</Typography>
      <Typography variant="body1" sx={{ color: "grey" }}>{account_id !== sender_acc ? sender_acc === 8268014734 ? "" : sender_acc : receiver_acc}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {account_id === sender_acc ? <Typography variant="subtitle1" sx={{ color: "red", marginRight: "10px", marginLeft: "auto" }}>
          -${amount}
        </Typography> :
          <Typography variant="subtitle1" sx={{ color: "green", marginRight: "10px", marginLeft: "auto" }}>
            ${amount}
          </Typography>}

        <Button onClick={handleModalOpen} sx={{ minWidth: "auto", padding: "0", marginLeft: "10px" }}>
          <InfoIcon />
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="transaction-details-modal"
        aria-describedby="transaction-details"
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={modalOpen}>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff",
              boxShadow: 24,
              p: 4,
              width: "80%",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={Logo}
              alt="logo"
              style={{ width: "150px", marginBottom: "20px" }}
            />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Transaction Details
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Name: {otherPartyName}
            </Typography>
            {account_id !== sender_acc ?
              <Typography variant="body1" sx={{ marginBottom: 1, color:"green" }}>
                Amount: ${amount}
              </Typography> :
              <Typography variant="body1" sx={{ marginBottom: 1, color:"red" }}>
                Amount: -${amount}
              </Typography>
            }

            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Type: {type}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Date: {formatDate(timestamp)}
            </Typography>
            <Typography variant="body1">
              Time: {new Date(timestamp).toLocaleString()}
            </Typography>
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
}
