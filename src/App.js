import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {

  const user  = true; // To be replaced with backend API

  return (
    <BrowserRouter>
      {user ? <AuthenticatedRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
