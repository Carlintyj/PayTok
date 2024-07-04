import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontSize: '2rem', // Adjust as needed
      },
      h2: {
        fontSize: '1.75rem', // Adjust as needed
      },
      h3: {
        fontSize: '1.5rem', // Adjust as needed
      },
      h4: {
        fontSize: '1.25rem', // Adjust as needed
      },
      h5: {
        fontSize: '1rem', // Adjust as needed
      },
      h6: {
        fontSize: '0.875rem', // Adjust as needed
      },
    },
    palette: {
      primary: {
        main: '#55AD9B',
      },
      secondary: {
        main: '#F1F8E8',
      },
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsAuth(user && user.isAuth);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isAuth ? <AuthenticatedRoutes /> : <PublicRoutes />}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
