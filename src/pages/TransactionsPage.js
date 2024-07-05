import React, { useEffect, useState } from "react";
import { Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TransactionHistoryCard from "../components/TransactionHistoryCard";

export default function Transactions() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual history retrieval logic
    setHistory([1,2,3,3,3,3,3,3,3,3]);
  }, []);

  const navigate = useNavigate();

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
      {history.map((transaction) => (<TransactionHistoryCard key={transaction.id} {...transaction} />
      ))}
    </Container>
  );
}
