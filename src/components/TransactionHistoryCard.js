import React from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionHistoryCard(transaction) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Transaction History Placeholder</h1>
    </div>
  );
}

{/* <Paper
          key={transaction.id}
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#fff",
            marginBottom: "20px",
            padding: "20px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {transaction.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {transaction.amount}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {transaction.date}
          </Typography>
        </Paper> */}