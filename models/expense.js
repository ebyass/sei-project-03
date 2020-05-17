const mongoose = require('mongoose')



const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  totalCost: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
  paidBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  owedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  amountOwed: { type: Number }
	
}, {
  timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema)