const { getBalance, updateBalance } = require('./UserService');

async function pay(senderAccId, receiverAccId, amount) {
    try {
    // Example: Check sender's balance
    const senderBalance = await getBalance(senderAccId);

    if (senderBalance < amount) {
        return false; // Insufficient balance
    }

    // Example: Update sender's balance
    await updateBalance(senderAccId, senderBalance - amount);

    // Example: Top up receiver's balance
    await topup(receiverAccId, amount);

    // Example: Create transaction
    const transactionData = { senderAccId, receiverAccId, amount };
    await createTransaction(transactionData);

    return true; // Successful payment
    } catch (error) {
    console.error('Error in pay:', error);
    throw error;
    }
}

async function topup(receiverAccId, amount) {
    try {
        // Example: Get receiver's current balance
        const receiverBalance = await getBalance(receiverAccId);

        // Example: Update receiver's balance
        await updateBalance(receiverAccId, receiverBalance + amount);

        return true; // Successful top-up
    } catch (error) {
        console.error('Error in topup:', error);
        throw error;
    }
}

async function getTransactionsHistory(uid) {
    try {
      // Example: Fetch transactions for the user
      const transactions = await getTransactions();
      
      // Example: Filter transactions by user UID
      const sourceTransactions = transactions.filter(transaction => transaction.source_uid === uid);
      const targetTransactions = transactions.filter(transaction => transaction.target_uid === uid);
  
      // Example: Return transaction history
      return { sourceTransactions, targetTransactions };
    } catch (error) {
      console.error('Error in getTransactionsHistory:', error);
      throw error;
    }
}

module.exports = {
    pay,
    topup,
    getTransactionsHistory,
};