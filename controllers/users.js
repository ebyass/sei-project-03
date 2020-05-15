const User = require('../models/user')

async function usersIndex(req, res, next) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function userShow(req, res) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error()
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ 'message': 'Not found' })
  }
}

async function userUpdate (req, res) {
  const userId = req.params.id
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(202).json(user)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function userDelete (req, res) {
  const userId = req.params.id
  try {
    await User.findByIdAndDelete(userId)
    res.sendStatus(204)
  } catch (err) {
    res.json(err)
  }
}


module.exports = {
  index: usersIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete
}