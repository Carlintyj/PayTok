import * as React from "react";
import { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Paper, Avatar, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { getBalance } from "../services/ProfileService";
import { getUserByAccount } from "../services/UserService";
import { pay } from "../services/PaymentService";
import Modal from "@mui/material/Modal";
import SuccessfulPaymentPage from "./SuccessfulPaymentPage";
import UnsuccessfulPaymentPage from "./UnsuccessfulPaymentPage";

export default function PaymentPage() {
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientName, setRecipientName] = useState("No User Found");
  const [open, setOpen] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openUnsuccessModal, setOpenUnsuccessModal] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setName(user.name);
        setAccount(user.account);
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

  const getImageURL = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.picture;
    }
  };

  const handleRecipientIdChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Only allow numbers
    setRecipientId(value.slice(0, 10)); // Limit to 10 digits
    getUserByAccount(value.slice(0, 10)).then((response) => {
      if (response) {
        setRecipientName(response.username);
      } else {
        setRecipientName("No User Found");
      }
    });
  };

  const handleAmountChange = (event) => {
    let value = event.target.value.replace(/[^0-9.]/g, ""); // Only allow numbers and decimal point

    // Split the value by the decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      // More than one decimal point, invalid input
      value = parts[0] + "." + parts.slice(1).join("");
    } else if (parts.length === 2 && parts[1].length > 2) {
      // More than two decimal places, trim the extra
      value = parts[0] + "." + parts[1].slice(0, 2);
    }

    setAmount(value);
  };

  const handlePayClick = (event) => {
    event.preventDefault();

    if (account === recipientId) {
      alert("You cannot transfer to yourself");
      return;
    } else if (recipientId.length < 10) {
      alert("Recipient Account ID must be 10 digits");
      return;
    } else if (amount > balance) {
      alert("The transaction amount exceeds your remaining balance. Please provide a valid amount.");
      return;
    }

    // Show the confirmation dialog
    setOpen(true);
  };

  const handleConfirmPay = () => {
    setOpen(false); // Close the dialog

    // Perform the payment
    pay(account, recipientId, amount).then((response) => {
      if (response) {
        setOpenSuccessModal(true);
      } else {
        setOpenUnsuccessModal(true);
      }
    });
  };

  return (
    <Container
      component="form"
      onSubmit={handlePayClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
      }}
    >
      <Paper sx={{ padding: "20px", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt="Avatar"
            src={getImageURL()}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography variant="h5" sx={{ marginLeft: "10px" }}>
              {name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: "5px", // Adjust as needed
              }}
            >
              <Typography variant="h5" sx={{ marginLeft: "10px", color: "grey" }}>
                {account}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#55AD9B", marginRight: "10px" }}>
                ${balance.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography variant="subtitle1" sx={{ color: "#55AD9B", paddingLeft: "20px" }}>
          ↓
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt="Avatar"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography variant="h5" sx={{ marginLeft: "10px" }}>
              {recipientName}
            </Typography>
            <TextField
              required
              placeholder="Recipient Account ID"
              variant="standard"
              type="number"
              value={recipientId}
              onChange={handleRecipientIdChange}
              InputProps={{ style: { fontSize: "16px" } }}
              sx={{ fontSize: "16px", marginLeft: "10px" }}
            />
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ backgroundColor: "#55AD9B", padding: "20px", width: "100%" }}>
        <TextField
          required
          label="Enter Amount"
          variant="standard"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
          InputProps={{
            style: { textAlign: "right", fontSize: "24px", color: "#ffffff" },
            startAdornment: <Typography variant="h3" sx={{ color: "#ffffff" }}>$</Typography>,
            inputProps: { style: { textAlign: "right", fontSize: "24px", color: "#ffffff" } },
          }}
          sx={{ textAlign: "center", fontSize: "24px", color: "#ffffff" }}
          placeholder="0.00"
        />
      </Paper>
      <Paper sx={{ padding: "20px", width: "100%" }}>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          PayTok Transfer
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          Please verify the recipient account ID and enter the amount you wish to transfer.
        </Typography>
      </Paper>

      <Box sx={{ flexGrow: 0.70 }} />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#55AD9B",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#458B7B",
          },
        }}
      >
        Pay Now
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to transfer ${amount} to account {recipientId} ({recipientName})?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "red" }}>No</Button>
          <Button onClick={handleConfirmPay} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={openUnsuccessModal}
        onClose={() => setOpenUnsuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UnsuccessfulPaymentPage amount={amount} recipientName={recipientName}/>
      </Modal>
      <Modal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SuccessfulPaymentPage amount={amount} recipientName={recipientName}/>
      </Modal>
    </Container>
  );
}
