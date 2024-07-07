import * as React from "react";
import {
  Typography,
  Paper,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const termsAndPolicies = [
  {
    title: "1. Service Usage",
    content:
      "PayTok is a digital payment platform. By using our service, you agree to these terms and our privacy policy.",
  },
  {
    title: "2. User Responsibilities",
    content:
      "You are responsible for maintaining the confidentiality of your account and for all activities under your account.",
  },
  {
    title: "3. Privacy & Security",
    content:
      "We implement security measures to protect your information, but cannot guarantee absolute security. See our privacy policy for details.",
  },
  {
    title: "4. Prohibited Activities",
    content:
      "Users must not engage in illegal activities, infringe on others' rights, or attempt to disrupt our service.",
  },
  {
    title: "5. Liability",
    content:
      "PayTok is not liable for indirect or consequential damages arising from the use of our service.",
  },
];

export default function Terms() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/profile");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F1F8E8",
        padding: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#55AD9B",
            padding: "15px 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleBackClick}
            sx={{ color: "#fff", marginRight: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: "#fff", flexGrow: 1 }}>
            Terms and Policies
          </Typography>
        </Box>

        <Box sx={{ padding: "20px" }}>
          <Typography variant="body2" sx={{ color: "#666", marginBottom: 2 }}>
            <strong>Last updated: 5 July 2024</strong>
          </Typography>

          {termsAndPolicies.map((section, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                "&:before": { display: "none" },
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#55AD9B" }} />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                sx={{
                  "&.Mui-expanded": {
                    minHeight: 48,
                    margin: "12px 0",
                  },
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "#333" }}>
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          <Typography
            variant="body2"
            sx={{
              marginTop: "20px",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            For full terms and conditions, please visit our website or contact
            our support team at{" "}
            <a href="mailto:support@PayTok.com" style={{ color: "#55AD9B" }}>
              support@PayTok.com
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
