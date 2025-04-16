import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Date, required: true },
  userId: { type: String, required: true }
}, {
  timestamps: true
});

export const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);