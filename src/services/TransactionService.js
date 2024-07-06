import axios from "axios";

// Example Axios instance configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api/transactions", // Adjust URL as per your API endpoint
  timeout: 5000, // Timeout after 5 seconds
});

api.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = process.env.REACT_APP_API_KEY; // Add your API key here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get all transactions
async function getTransactions() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to get a transaction by transactionId
async function getTransactionById(transactionId) {
  try {
    const response = await api.get(`/${transactionId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to create a new transaction
async function createTransaction(transactionData) {
  try {
    const response = await api.post("/", transactionData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to delete a transaction by transactionId
async function deleteTransaction(transactionId) {
  try {
    const response = await api.delete(`/${transactionId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Helper function to handle Axios errors
function handleAxiosError(error) {
  return null;
}

export {
  getTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
};
