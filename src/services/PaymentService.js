const { updateUserBalance } = require("./UserService");
const { getBalance } = require("./ProfileService");

async function pay(sender_uid, receiver_uid, amount) {
  try {
    const senderBalance = await getBalance(sender_uid);
    const receiverBalance = await getBalance(receiver_uid);
    const type = "transfer";

    if (senderBalance < amount || amount < 0) {
      return null; // Insufficient balance
    }

    await updateUserBalance(sender_uid, senderBalance - amount);
    await updateUserBalance(receiver_uid, receiverBalance + amount);
    const transactionData = { sender_uid, receiver_uid, type, amount };
    await createTransaction(transactionData);

    return true; // Successful payment
  } catch (error) {
    handleAxiosError(error);
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
    handleAxiosError(error);
  }
}

async function getTransactionsHistory(uid) {
  try {
    const transactions = await getTransactions();
    transactions = transactions.filter(
      (transaction) =>
        transaction.source_uid === uid || transaction.target_uid === uid
    );
    return transactions;
  } catch (error) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error) {
  return null;
}

module.exports = {
  pay,
  topup,
  getTransactionsHistory,
};
