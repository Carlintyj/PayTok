import React, { useEffect, useState } from "react";
import { Typography, Container, Paper } from "@mui/material";
import TransactionHistoryCard from "../components/TransactionHistoryCard";
import { getTransactionsHistory } from "../services/PaymentService";

export default function Transactions() {
  const [history, setHistory] = useState([]);

  const getuid = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.uid;
    }
    return -1;
  }

  useEffect(() => {
    const uid = getuid();
    if (uid !== -1) {
      getTransactionsHistory(uid)
        .then((transactions) => {
          const transactionsArray = Object.values(transactions);
          transactionsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setHistory(transactionsArray);
        });
    }
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)", // Adjusted for bottom navigation (assuming 64px height)
        backgroundColor: "#F1F8E8",
        overflowY: "auto", // Enable vertical scrolling if content exceeds container height
        paddingBottom: "80px", // Ensure content doesn't overlap with bottom navigation
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#55AD9B",
          marginBottom: "20px",
          padding: "20px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Transactions History
        </Typography>
      </Paper>
      {history.length === 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Typography variant="h6" sx={{ color: "black" }}>
          No transaction history found
        </Typography>
      </div>
      )}
      {history.map((transaction) => (
        <TransactionHistoryCard
          key={transaction.transactionId}
          amount={transaction.amount}
          receiver_acc={transaction.receiver_acc}
          sender_acc={transaction.sender_acc}
          type={transaction.type}
          timestamp={transaction.timestamp}
        />
      ))}
    </Container>
  );
}
