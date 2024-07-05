import * as React from "react";
import { Button, Typography, Container } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export default function UnsuccessfulPaymentPage() {

  const handleBackClick = () => {
    window.location.reload();
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
      }}
    >
      <CancelIcon sx={{fontSize: "200px", color: "#FF0000"}}/>
      <Typography variant="h5" sx={{alignContent: "center", marginTop: "20px", fontWeight: "bold"}}>
        Payment unsuccessful!
      </Typography>
      <Typography variant="h6" sx={{alignContent: "center", marginTop: "20px"}}>
        An error has occured, please try again later.
        </Typography>
      <Button
        onClick={handleBackClick}
        variant="contained"
        gutterBottom
        sx={{color:"#ffffff", marginTop: "100px", marginBottom: "20px", fontWeight: "bold", backgroundColor: "#55AD9B", "&:hover": { backgroundColor: "#55AD9B"}}}
      >
        Back
      </Button>
    </Container>
  );
}