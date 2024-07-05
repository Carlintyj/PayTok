import axios from "axios";

// Example Axios instance configuration
const api = axios.create({
  // TODO: Change to https://paytok.onrender.com
  baseURL: "http://localhost:4000/api/users", // Adjust URL as per your API endpoint
  timeout: 5000, // Timeout after 5 seconds
});

// Function to get all users
async function getUsers() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to get user by UID
async function getUserByUid(uid) {
  try {
    const response = await api.get(`/uid/${uid}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to get user by Account
async function getUserByAccount(account) {
  try {
    const response = await api.get(`/account/${account}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to create a new user
async function createUser(userData) {
  try {
    const response = await api.post("/", userData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to update user role by UID
async function updateUserRole(uid) {
  try {
    const response = await api.put(`/${uid}/role`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to update user pin by UID
async function updateUserPin(uid, pin) {
  try {
    const response = await api.put(`/${uid}/pin`, { pin });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to update user balance by UID
async function updateUserBalance(uid, balance) {
  try {
    const response = await api.put(`/${uid}/balance`, { balance });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

// Function to delete user by UID
async function deleteUser(uid) {
  try {
    const response = await api.delete(`/${uid}`);
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
  getUsers,
  getUserByUid,
  getUserByAccount,
  createUser,
  updateUserRole,
  updateUserPin,
  updateUserBalance,
  deleteUser,
};
