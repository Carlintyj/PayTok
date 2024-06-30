const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, enum: ['user', 'agent'], default: 'agent' },
    account: { type: Number, unique: true, required: true },
    balance: { type: Number, default: '0' }
});

module.exports = mongoose.model('Agent', AgentSchema);