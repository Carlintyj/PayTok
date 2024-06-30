const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  transactionId: { type: Number, unique: true },
  source_username: { type: String, required: true },
  target_username: { type: String, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  amount: { type: Number, unique: true, required: true },
  timestamp: { type: Date, default: Date.now },
  description: {type: String }
});

let transactionCounter = 1;

TransactionSchema.pre('save', function(next) {
    if (!this.transactionId) {
        this.transactionId = transactionCounter++;
    }
    next();
});

module.exports = mongoose.model('Transaction', TransactionSchema);