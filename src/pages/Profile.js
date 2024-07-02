import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

/**
 * A component for displaying profile page UI (User Profile/ Edit Profile/ Change Password/ Delete Account)
 * @component
 * @returns {JSX.Element} Profile Page UI.
 */
export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Log out from Google
    googleLogout();
    
    // Remove user from localStorage
    localStorage.removeItem("user");
    
    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event("storage"));
    
    // Navigate to login page
    navigate("/");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
