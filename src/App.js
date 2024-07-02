import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(false);

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
    <BrowserRouter>
      {user ? <AuthenticatedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
