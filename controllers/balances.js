const User = require('../models/user')

async function balanceShow (req, res) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error()
    res.status(200).json(user.balance)
  } catch (err) {
    res.status(422).json(err)
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
      user.balance = user.balance + amount
    } 
    if (operation === 'decrease') {
      user.balance = user.balance - amount
    }
    await user.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  show: balanceShow,
  change: changeBalance
}