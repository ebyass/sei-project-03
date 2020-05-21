const Expense = require('../models/expense')
const User = require('../models/user')

async function expensesIndex(req, res) {
  try {
    const expenses = await Expense.find()
    if (expenses.length === 0) throw new Error('no expenses') // * Changed this error handling to check the array length, so that the error can be thrown if no expenses exist
    res.status(200).json(expenses)
  } catch (err) {
    if (err.message === 'no expenses') {
      res.status(404).json({ 'message': 'No expenses found' })
    } else {
      res.status(404).json(err)
    }
  }
}


async function expensesCreate(req, res) {
  try {
    const userExpensePaidBy = await User.findById(req.body.paidBy)
    const userExpenseOwedBy = await User.findById(req.body.owedBy)
    userExpensePaidBy.friends.map(friend => {
      if (JSON.stringify(friend.user) === JSON.stringify(userExpenseOwedBy.id) && friend.accepted === false) { // ! Need to build out function so if users do not exist AT ALL in friend array, expense can not be created
        throw new Error('not confirmed') // * Want error message displayed to clearly state it's because you are not confirmed friends
      }
    })
    const createdExpense = await Expense.create(req.body)
    const expenseId = await createdExpense._id
    userExpensePaidBy.expenses.push({ expenseId: expenseId })
    userExpenseOwedBy.expenses.push({ expenseId: expenseId })
    userExpensePaidBy.save()
    userExpenseOwedBy.save()
    res.status(201).json(createdExpense)
  } catch (err) {
    if (err.message === 'not confirmed') {
      res.status(403).json({ 'message': 'The other user has not yet accepted your friend request' })
    } else {
      res.status(404).json(err)
    }
    
  }
}


async function expensesShow(req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findById(expenseId)
    if (!expense) throw new Error()
    res.status(200).json(expense)
  } catch (err) {
    res.status(404).json({ 'message': 'That expense is not found' })
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
    res.status(422).json({ 'message': 'That expense does not exist' })
  }
}

async function expensesDelete(req, res) {
  const expenseId = req.params.id
  try {
    await Expense.findByIdAndDelete(expenseId)
    res.sendStatus(204)
  } catch (err) {
    res.status(422).json({ 'message': 'That expense does not exist' })
  }
}

async function expenseAccept(req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findById(expenseId)
    if (JSON.stringify(expense.owedBy) !== JSON.stringify(req.currentUser._id)) throw new Error() // * Only logged in users that are the owedBy user of expense can accept the expense
    expense.accepted = true
    await expense.save()
    res.status(202).json(expense)
  } catch (err) {
    res.status(422).json({ 'message': 'You are not the debtor of this expense' })
  }
}

async function expenseSettle(req, res) {
  const expenseId = req.params.id
  try {
    const expense = await Expense.findById(expenseId)
    const debtor = await User.findById(expense.owedBy)
    const payee = await User.findById(expense.paidBy)
    if (JSON.stringify(expense.owedBy) !== JSON.stringify(req.currentUser._id)) throw new Error('Not debtor') // * Debt can only be settled by the user who owes the debt
    if (expense.accepted === false) throw new Error('Expense not accepted') // * Debt can only be settled if the expense has been accepted
    if (expense.settled === true) throw new Error('Expense already settled') // * Debt can not be settled twice
    if (debtor.balance < expense.amountOwed) throw new Error('Not enough balance') // * Debt can not be settled if the user who owes the debt has less money in their account than the debt
    debtor.balance = debtor.balance - expense.amountOwed
    payee.balance = payee.balance + expense.amountOwed
    expense.settled = true
    await debtor.save()
    await payee.save()
    await expense.save()
    res.status(202).json(expense)
  } catch (err) {
    if (err.message === 'Not debtor') {
      res.status(422).json({ 'message': 'You are not the debtor of this expense' })
    } else if (err.message === 'Expense not accepted') {
      res.status(422).json({ 'message': 'The expense has not been accepted yet' })
    } else if (err.message === 'Expense already settled') {
      res.status(422).json({ 'message': 'This expense has already been settled' })
    } else if (err.message === 'Not enough balance') {
      res.status(422).json({ 'message': 'You do not have sufficient balance within your account to settle this expense' })
    } else {
      res.status(422).json(err)
    } 
  }
}

async function expensesOwedToUser(req, res) { // * To populate ACCEPTED expenses owed to user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.paidBy) === userId &&
              expense.accepted === true &&
              expense.settled === false
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function expensesUserOwe(req, res) { // * To populate ACCEPTED expenses owed by user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.owedBy) === userId &&
              expense.accepted === true &&
              expense.settled === false
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}


async function expensesToAcceptUserOwe(req, res) { // * To populate PENDING expenses owed by user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.owedBy) === userId &&
              expense.accepted === false
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function pendingExpensesOwedToUser(req, res) { // * To populate PENDING expenses owed to user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.paidBy) === userId &&
              expense.accepted === false
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function settledExpensesOwedByUser(req, res) { // * To populate SETTLED expenses paid by user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.owedBy) === userId &&
              expense.settled === true
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function settledExpensesOwedToUser(req, res) { // * To populate SETTLED expenses owed to user
  const userId = JSON.stringify(req.currentUser._id)
  try {
    const allExpenses = await Expense.find()
    const filteredExpenses = allExpenses.filter((expense) => {
      return JSON.stringify(expense.paidBy) === userId &&
              expense.settled === true
    })
    res.status(200).json(filteredExpenses)
  } catch (err) {
    res.status(404).json(err)
  }
}



module.exports = {
  index: expensesIndex,
  create: expensesCreate,
  show: expensesShow,
  update: expensesUpdate,
  delete: expensesDelete,
  accept: expenseAccept,
  settle: expenseSettle,
  owedToExpenses: expensesOwedToUser,
  owedByExpenses: expensesUserOwe,
  pendingExpensesToAccept: expensesToAcceptUserOwe,
  pendingExpensesToUser: pendingExpensesOwedToUser,
  userSettledExpenses: settledExpensesOwedByUser,
  userSettledWithExpenses: settledExpensesOwedToUser
}