import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [user, setUser] = useState(false);
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
    const user = localStorage.getItem("user");
    setUser(!!user);
  }, []);

  useEffect(() => {
    // Listen to storage events to update user state across tabs/windows
    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setUser(!!user);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      {user ? <AuthenticatedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
