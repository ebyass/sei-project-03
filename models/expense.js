const mongoose = require('mongoose')



const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  totalCost: { type: Number, required: true },
  dueDate: { 
    type: Date, 
    required: true, 
    default: (Date.now() + 7 * 24 * 60 * 60 * 1000 ) 
  },
  paidBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  owedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  amountOwed: { type: Number },
  accepted: { type: Boolean, default: false },
  settled: { type: Boolean, default: false }
}, {
  timestamps: true
})

module.exports = mongoose.model('Expense', expenseSchema)