const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  transactionId: { type: Number, unique: true },
  source_username: { type: String, required: true },
  target_username: { type: String, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal', 'transfer'], required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  description: {type: String }
});

TransactionSchema.pre('save', async function(next) {
  try {
      if (!this.transactionId) {
          const doc = await Counter.findOneAndUpdate(
              { _id: 'transactionId' },
              { $inc: { sequence_value: 1 } },
              { new: true, upsert: true, setDefaultsOnInsert: true }
          );
          this.transactionId = doc.sequence_value;
      }
      next();
  } catch (error) {
      next(error);
  }
});

const Counter = mongoose.model('Counter', new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
}));

module.exports = mongoose.model('Transaction', TransactionSchema);