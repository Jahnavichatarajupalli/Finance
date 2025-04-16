import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining',
      'Shopping',
      'Transportation',
      'Bills & Utilities',
      'Entertainment',
      'Healthcare',
      'Education',
      'Income',
      'Other'
    ]
  },
  type: { type: String, required: true, enum: ['debit', 'credit'] }

}, {
  timestamps: true
});

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);