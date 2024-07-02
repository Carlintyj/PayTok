const axios = require('axios');

// Example Axios instance configuration
const api = axios.create({
  baseURL: 'http://localhost:4000/api/transactions', // Adjust URL as per your API endpoint
  timeout: 5000, // Timeout after 5 seconds
});

// Function to get all transactions
async function getTransactions() {
  try {
    const response = await api.get('/');
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
    const response = await api.post('/', transactionData);
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
  console.error('Axios request failed:', error.message);
  throw new Error('Server Error');
}

module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  deleteTransaction,
};