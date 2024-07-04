import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, Container, FormGroup } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { checkPin, changePin } from "../services/ProfileService";


export default function ChangePIN() {
    const navigate = useNavigate();

    const [account, setAccount] = useState("");
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setAccount(user.account);
      }
    }, []);

    const [oldpin, setOldpin] = useState("");
    const [newpin, setNewpin] = useState("");
    const [cnewpin, setCnewpin] = useState("");

    const handleOldChange = () => {
        setOldpin(oldpin)
    };

    const handleNewChange = () => {
        setNewpin(newpin)
    };

    const handleCnewChange = () => {
        setCnewpin(cnewpin)
    };

    const handleBackClick = () => {
      navigate("/accountdetails");
    };

        
    const handleSubmit = () => {
        
        if(newpin!==cnewpin){
            return <Typography>not same</Typography>
        }
        else if (!checkPin(account, oldpin)){
            return <Typography>not old</Typography>
        }
        else{
            changePin(account, oldpin, newpin)
            return <Typography>ok</Typography>
        }
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
            Change PIN
            </Typography>
        </Paper>
        
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <TextField onChange={handleOldChange}
                required
                label="Old PIN"
                defaultValue={oldpin}
                sx={{margin:"10px"}}
                />
            
            </FormGroup>

            <FormGroup>
                <TextField onChange={handleNewChange}
                required
                label="New PIN"
                defaultValue={newpin}
                sx={{margin:"10px"}}
                />
            </FormGroup>
            
            <FormGroup>
                <TextField onChange={handleCnewChange}
                required
                label="Confirm New Pin"
                defaultValue={cnewpin}
                sx={{margin:"10px"}}
                />
            </FormGroup>
            
            <FormGroup>
                <Button type="submit"
                sx={{margin:"10px"}}>Change PIN</Button>
            </FormGroup>
            

        </form>
        

        <Button onClick={handleBackClick}>Back</Button>
        
      </Container>
    );
}