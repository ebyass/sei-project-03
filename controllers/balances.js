const User = require('../models/user')

async function balanceShow (req, res) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error()
    res.status(200).json(user.balance)
  } catch (err) {
    res.status(404).json(err)
  }
} 

async function changeBalance (req, res) {
  const userId = req.params.id
  const amount = req.body.amount
  const operation = req.body.operation
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error()
    if (operation === 'increase') {
      user.balance = user.balance + Number(amount)
    } 
    if (user.balance < amount) throw new Error()
    if (operation === 'decrease') {
      user.balance = user.balance - Number(amount)
    }
    await user.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(401).json({ message: 'Not enough money in account' })
  }
}

module.exports = {
  show: balanceShow,
  change: changeBalance
}