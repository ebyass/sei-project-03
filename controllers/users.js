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

async function userFriendRequestCreate (req, res) {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    // * if (!user.friends.user.req.params.id) throw new Error() ---- NOT WORKING AS INTENDED
    const requestUser = await User.findById(req.currentUser._id)
    user.friends.push({ user: req.currentUser._id })
    await user.save()
    requestUser.friends.push({ user: user._id, accepted: true })
    await requestUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(422).json({ 'message': 'Request already exists' })
  }
}

async function userFriendRequestsShow (req, res) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
    if (!user) throw new Error()
    const friends = user.friends
    res.status(200).json(friends)
  } catch (err) {
    res.status(404).json(err)
  }
}

async function confirmFriendRequest (req, res) {
  try {
    const userId = req.params.id
    const requestId = req.params.requestId
    console.log(requestId)
    const user = await User.findById(userId)
    const requestToUpdate = user.friends.id(requestId)
    requestToUpdate.update(req.body)
    // console.log('user.friends', user.friends.findById(requestId))
    // await user.friends.findByIdAndUpdate(requestId, { accepted: true }, { new: true })
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  index: usersIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete,
  friendRequestsShow: userFriendRequestsShow,
  friendRequestCreate: userFriendRequestCreate,
  friendRequestAccept: confirmFriendRequest
}