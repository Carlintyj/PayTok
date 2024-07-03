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
            <Route path="/transactions" element={<Transactions />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {agent ? <AgentNavbar /> : <UserNavbar />}
        </>
    );
};

export default AuthenticatedRoutes;