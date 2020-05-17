const User = require('../models/user')
const { notFound, unauthorized } = require('../lib/errorMessages')

async function usersIndex(req, res, next) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function userShow(req, res, next) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userUpdate (req, res, next) {
  const userId = req.params.id
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(202).json(user)
  } catch (err) {
    next(err)
  }
}

async function userDelete (req, res, next) {
  const userId = req.params.id
  try {
    await User.findByIdAndDelete(userId)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function userFriendRequest (req, res, next) {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)
    // if (user) throw new Error(unauthorized)
    // * if (!user.friends.user.req.params.id) throw new Error() ---- NOT WORKING AS INTENDED
    const requestUser = await User.findById(req.currentUser._id)
    user.friends.push({ user: req.currentUser._id })
    await user.save()
    requestUser.friends.push({ user: user._id, accepted: true })
    await requestUser.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}



async function confirmFriendRequest (req, res, next) {
  try {
    const userId = req.params.id
    const requestId = req.params.requestId
    const user = await User.findById(userId)
    user.friends.map(friend => {
      if (friend.id === requestId) {
        friend.accepted = true
      }
    })
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: usersIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete,
  friend: userFriendRequest,
  accept: confirmFriendRequest
}