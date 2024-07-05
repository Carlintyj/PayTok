import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PaymentPage from "../pages/PaymentPage";
import Profile from "../pages/Profile";
import Transactions from "../pages/TransactionsPage";
import NotFoundPage from "../pages/NotFoundPage";
import AgentNavbar from "../components/AgentNavbar";
import UserNavbar from "../components/UserNavbar";
import AccountDetails from "../pages/AccountDetails";
import WalletSettings from "../pages/WalletSettings";
import SupportFAQ from "../pages/SupportFAQ";
import Report from "../pages/Report";
import Terms from "../pages/Terms";
import ChangePIN from "../pages/ChangePIN";
import { useState, useEffect } from "react";
const AuthenticatedRoutes = () => {

    const [isAgent, setIsAgent] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setIsAgent(user.role === "agent");
        }
      }, []);

    return (
        <>

            <div style={{ minHeight: "110vh" }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/accountdetails" element={<AccountDetails />} />
                    { isAgent ? <Route path="/wallet" element={<WalletSettings />} /> : null}
                    <Route path="/support" element={<SupportFAQ />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/terms" element={<Terms />} />
                     <Route path="/changepin" element={<ChangePIN />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            {isAgent ? <AgentNavbar /> : <UserNavbar />}
        </>
    );
};

export default AuthenticatedRoutes;