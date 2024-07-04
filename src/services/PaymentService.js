const { getBalance, updateUserBalance } = require("./UserService");
const { getBalance } = require("./ProfileService");

async function pay(sender_uid, receiver_uid, amount) {
  try {
    const senderBalance = await getBalance(sender_uid);
    const receiverBalance = await getBalance(receiver_uid);
    const type = "transfer";

    if (senderBalance < amount) {
      return false; // Insufficient balance
    }

    await updateUserBalance(sender_uid, senderBalance - amount);
    await updateUserBalance(receiver_uid, receiverBalance + amount);
    const transactionData = { sender_uid, receiver_uid, type, amount };
    await createTransaction(transactionData);

    return true; // Successful payment
  } catch (error) {
    console.error("Error in pay:", error);
    throw error;
  }
}

async function topup(sender_uid, receiver_uid, amount) {
  try {
    const receiverBalance = await getBalance(receiver_uid);
    const type = "top-up";

    await updateBalance(receiver_uid, receiverBalance + amount);
    const transactionData = { sender_uid, receiver_uid, type, amount };
    await createTransaction(transactionData);

    return true; // Successful top-up
  } catch (error) {
    console.error("Error in topup:", error);
    throw error;
  }
}

async function getTransactionsHistory(uid) {
  try {
    const transactions = await getTransactions();
    const sourceTransactions = transactions.filter(
      (transaction) => transaction.source_uid === uid
    );
    const targetTransactions = transactions.filter(
      (transaction) => transaction.target_uid === uid
    );
    return { sourceTransactions, targetTransactions };
  } catch (error) {
    console.error("Error in getTransactionsHistory:", error);
    throw error;
  }
}

module.exports = {
  pay,
  topup,
  getTransactionsHistory,
};
