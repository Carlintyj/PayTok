const { getUserByAccount, updateUserBalance, getUserByUid } = require("./UserService");
const { getBalance } = require("./ProfileService");
const { createTransaction, getTransactions } = require("./TransactionService");

async function pay(sender_acc, receiver_acc, amount) {
  try {
    const { uid: sender_uid } = await getUserByAccount(sender_acc);
    const { uid: receiver_uid } = await getUserByAccount(receiver_acc);
    const senderBalance = await getBalance(sender_uid);
    const receiverBalance = await getBalance(receiver_uid);
    const type = "transfer";

    if (senderBalance < amount || amount < 0) {
      return null; // Insufficient balance
    }

    await updateUserBalance(sender_uid, senderBalance - amount);
    await updateUserBalance(receiver_uid, receiverBalance + amount);
    const transactionData = { sender_acc, receiver_acc, type, amount };
    await createTransaction(transactionData);

    return true; // Successful payment
  } catch (error) {
    handleAxiosError(error);
  }
}

async function topup(sender_acc, receiver_acc, amount) {
  try {
    const { uid: sender_uid } = await getUserByAccount(sender_acc);
    const { uid: receiver_uid } = await getUserByAccount(receiver_acc);
    const receiverBalance = await getBalance(receiver_uid);
    const type = "top-up";

    if (sender_uid !== 1234567890123456) {
      return null;
    }

    await updateUserBalance(receiver_uid, receiverBalance + amount);
    const transactionData = { sender_acc, receiver_acc, type, amount };
    await createTransaction(transactionData);

    return true; // Successful top-up
  } catch (error) {
    handleAxiosError(error);
  }
}

async function getTransactionsHistory(uid) {
  try {
    const { account: user_account_id } = await getUserByUid(uid);
    var transactions = await getTransactions();
    transactions = transactions.filter(
      (transaction) =>
        transaction.sender_acc === user_account_id || transaction.receiver_acc === user_account_id
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
