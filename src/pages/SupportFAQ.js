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

const faqData = [
  {
    question: "How do I sign in to the app?",
    answer:
      "We use Google Sign-In for authentication. Simply click on the 'Sign in with Google' button on the login page and follow the prompts to sign in using your Google account. If you don't have a Google account, you'll need to create one first.",
  },
  {
    question:
      "Where can I find information about the app's terms and policies?",
    answer:
      "You can find detailed information about our terms of service and privacy policies within the app. Go to the Profile section and look for 'Terms and Policies'. Click on it to read our full terms of service, privacy policy, and any other relevant policies.",
  },
  {
    question: "How can I change my PIN?",
    answer:
      "To change your PIN, navigate to the Account Details section in the app under Profile. Look for an option labeled 'Change PIN'. Click on this option and follow the instructions to verify your identity and set a new PIN. Remember to choose a PIN that's secure and not easily guessable.",
  },
  {
    question: "How can I get help or report an issue?",
    answer:
      "If you need assistance or want to report a problem:\n\n" +
      "1. Use the 'Report an Issue' feature: Go to your Profile page and select 'Report an Issue'. Describe your problem or question in detail.\n\n" +
      "2. For urgent matters: You can email us directly at support@PayTok.com.\n\n" +
      "We aim to respond to all inquiries within 24 hours. Our team will review your submission and get back to you as soon as possible to address your concerns or answer your questions.",
  },
];

export default function SupportFAQ() {
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
            Support & FAQ
          </Typography>
        </Box>

        <Box sx={{ padding: "20px" }}>
          {faqData.map((faq, index) => (
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
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-start",
          width: "100%",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
          Still need help?
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "#555" }}>
          If you couldn't find the answer to your question, please contact our
          support team at{" "}
          <a href="mailto:support@PayTok.com" style={{ color: "#55AD9B" }}>
            support@PayTok.com
          </a>
        </Typography>
      </Box>
    </Container>
  );
}
