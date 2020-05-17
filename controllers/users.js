const User = require('../models/user')
const { notFound } = require('../lib/errorMessages')

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

async function userFriendRequestCreate (req, res, next) {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) throw new Error(notFound)
    // if (user) throw new Error(unauthorized)
    // * if (!user.friends.user.req.params.id) throw new Error() ---- NOT WORKING AS INTENDED
    const requestUser = await User.findById(req.currentUser._id)
    user.friends.push({ user: req.currentUser._id, firstName: req.currentUser.firstName })
    await user.save()
    requestUser.friends.push({ user: user._id, accepted: false, firstName: user.firstName })
    await requestUser.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
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

async function confirmFriendRequest (req, res, next) {
  try {
    const userId = req.params.id
    
    const requestId = req.params.requestId
    
    const user = await User.findById(userId)

    user.friends.map(friend => {
      
      if (friend.id === requestId) { //* <--- why is it id and not _id ??
        console.log(friend.id)
        friend.accepted = true
        console.log('friends array updated')
        const friendId = friend.user
        friendToUpdate(friendId, user)

      }
    })
    await user.save()
    
    res.status(202).json(user)
  } catch (err) {
    console.log(err)
  }
}

async function friendToUpdate(friendId, user) {
	
  try {
    console.log('friendId', friendId)
    const friendToUpdate = await User.findById(friendId)
    console.log('friendToUpdate', friendToUpdate)
    friendToUpdate.friends.map(friend => {
      console.log(typeof(JSON.stringify(friend.user)), typeof(user.id))
      if (JSON.stringify(friend.user) === JSON.stringify(user.id)) {
        console.log(friend.user, user.id)
        friend.accepted = true
      }
    })
    await friendToUpdate.save()
  } catch (err) {
    console.log(err)
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