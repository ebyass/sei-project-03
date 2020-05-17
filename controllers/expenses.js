const Expense = require('../models/expense')
const User = require('../models/user')

async function expensesIndex(req, res) {
  try {
    const expenses = await Expense.find()
    if (expenses.length === 0) throw new Error() // * Changed this error handling to check the array length, so that the error can be thrown if no expenses exist
    res.status(200).json(expenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function expensesCreate(req, res) {
  try {
    const userExpensePaidBy = await User.findById(req.body.paidBy)
    console.log('paid by', userExpensePaidBy)
    const userExpenseOwedBy = await User.findById(req.body.owedBy)
    console.log('owed by', userExpenseOwedBy)


    userExpensePaidBy.friends.map(friend => {
      if (JSON.stringify(friend.user) !== JSON.stringify(userExpenseOwedBy._id) /*|| (JSON.stringify(friend.accepted) === false ) */ ) throw new Error()
    })
    console.log('trueee')
    const createdExpense = await Expense.create(req.body)
    console.log('createdExpense', createdExpense)
    const expenseId = await createdExpense._id
    console.log('expenseId', expenseId)

    res.status(201).json(createdExpense)
  } catch (err) {
    res.status(422).json(err)
  }
}


async function expensesShow(req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findById(expenseId)
    if (!expense) throw new Error()
    res.status(200).json(expense)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function expensesUpdate(req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      { new: true, runValidators: true }
    )
    if (!expense) throw new Error()
    res.status(202).json(expense)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function expensesDelete(req, res) {
  const expenseId = req.params.id
  try {
    await Expense.findByIdAndDelete(expenseId)
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}



module.exports = {
  index: expensesIndex,
  create: expensesCreate,
  show: expensesShow,
  update: expensesUpdate,
  delete: expensesDelete
}