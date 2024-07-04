const { createUser, getUserByUid, updateUserPin } = require("./UserService");

async function login(uid, username, email) {
  try {
    let user = await getUserByUid(uid);
    if (!user) {
      const userData = { uid, username, email };
      user = await createUser(userData);
    }

    const role = user.role;
    const account = user.account;

    return { role, account };
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
}

async function getBalance(uid) {
  try {
    const user = await getUserByUid(uid);
    if (!user) {
      throw new Error("User not found");
    }

    return user.balance;
  } catch (error) {
    console.error("Error in getBalance:", error);
    throw error;
  }
}

async function checkPin(uid, pin) {
  try {
    const user = await getUserByUid(uid);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPin = crypto.createHash("sha256").update(pin).digest("hex");
    return user.pin === hashedPin;
  } catch (error) {
    console.error("Error in checkPin:", error);
    throw error;
  }
}

async function changePin(uid, oldPin, newPin) {
  try {
    const isValid = await checkPin(uid, oldPin);
    if (!isValid) {
      throw new Error("Invalid Pin");
    }

    const status = await updateUserPin(uid, newPin);

    return status ? true : false;
  } catch (error) {
    console.error("Error in setPin:", error);
    throw error;
  }
}

module.exports = {
  login,
  getBalance,
  checkPin,
  changePin,
};
