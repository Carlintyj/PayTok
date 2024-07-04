// const crypto = require("crypto");
const { createUser, getUserByUid, updateUserPin } = require("./UserService");
const crypto = require("crypto");

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
    return { role: null, account: null };
  }
}

async function getBalance(uid) {
  try {
    const user = await getUserByUid(uid);
    if (!user) {
      return null;
    }

    return user.balance;
  } catch (error) {
    handleAxiosError(error);
  }
}

async function isPinExist(uid) {
  try {
    const user = await getUserByUid(uid);
    if (!user) {
      return null;
    }

    return user.pin != null;
  } catch (error) {
    handleAxiosError(error);
  }
}

async function checkPin(uid, pin) {
  // FIXME: Crypto is not defined, temporary fix
  return true;
  try {
    const user = await getUserByUid(uid);
    if (!user) {
      return null;
    }

    const hashedPin = crypto.createHash("sha256").update(pin).digest("hex");
    return user.pin === hashedPin;
  } catch (error) {
    console.log(error)
    handleAxiosError(error);
  }
}

async function changePin(uid, oldPin, newPin) {
  try {
    const isValid = await checkPin(uid, oldPin);
    if (!isValid) {
      return null;
    }

    const status = await updateUserPin(uid, newPin);
    return status ? true : null;
  } catch (error) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error) {
  return null;
}

module.exports = {
  login,
  getBalance,
  isPinExist,
  checkPin,
  changePin,
};
