const express = require('express');
const router = express.Router();
const Agent = require('../../models/Transaction');

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
      const transaction = await Transaction.findById(req.params.transactionId);
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
      const transaction = await Transaction.findById(req.params.transactionId);

      if (!transaction) {
          return res.status(404).json({ msg: 'Transaction not found' });
      }

      await transaction.remove();
      res.json({ msg: 'Transaction removed' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;