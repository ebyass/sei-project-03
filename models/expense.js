const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  totalCost: { type: Number, required: true },
  date: { type: Date, required: true },
  paidBy: { type: String, required: true },
  owedBy: { type: String, required: true },
  amountOwed: { type: Number }
}, {
  timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema)