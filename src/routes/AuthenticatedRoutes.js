import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import PaymentPage from "../pages/PaymentPage";
import SuccessfulPaymentPage from "../pages/SuccessfulPaymentPage";
import UnsuccessfulPaymentPage from "../pages/UnsuccessfulPaymentPage";
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
const AuthenticatedRoutes = () => {
    const agent = false; // To be replaced with backend API

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/successfulPayment" element={<SuccessfulPaymentPage />} />
            <Route path="/unsuccessfulPayment" element={<UnsuccessfulPaymentPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/accountdetails" element={<AccountDetails />} />
            <Route path="/wallet" element={<WalletSettings />} />
            <Route path="/support" element={<SupportFAQ />} />
            <Route path="/report" element={<Report />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/changepin" element={<ChangePIN />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {agent ? <AgentNavbar /> : <UserNavbar />}
        </>
    );
};

export default AuthenticatedRoutes;