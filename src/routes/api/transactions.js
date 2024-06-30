const express = require('express');
const router = express.Router();
const Transaction = require('../../models/Transaction');

// @route   GET api/transcations
// @desc    Get the list of transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
      const transactions = await Transaction.find().sort({ timestamp: -1 });
      res.json(transactions);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route   GET api/transcations/:transactionId
// @desc    Get a transaction
// @access  Public
router.get('/:transactionId', async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        // Find the transaction by transactionId
        const transaction = await Transaction.findOne({ transactionId });

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        res.json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/transactions
// @desc    Create a new transaction
// @access  Public
router.post('/', async (req, res) => {
  try {
      const newTransaction = new Transaction(req.body);
      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route   DELETE api/transactions/:transactionId
// @desc    Delete an agent
// @access  Public
router.delete('/:transactionId', async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        // Check if the transaction exists
        const transaction = await Transaction.findOne({ transactionId });

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        // Delete the transaction
        await Transaction.deleteOne({ transactionId });

        res.json({ msg: 'Transaction deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;