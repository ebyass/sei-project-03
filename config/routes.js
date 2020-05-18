const router = require('express').Router()
const auth = require('../controllers/auth')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')
const expenses = require('../controllers/expenses')
const balance = require('../controllers/balances')

router.route('/expenses')
  .get(expenses.index)
  .post(expenses.create)

router.route('/expenses/:id')
  .get(expenses.show)
  .post(expenses.update)
  .delete(expenses.delete)

router.route('/register')
  .post(auth.register)
	
router.route('/login')
  .post(auth.login)
	
router.route('/users')
  .get(users.index)

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete)
	
router.route('/users/:id/friends/requests')
  .get(users.friendRequestsShow)
  .post(secureRoute, users.friendRequestCreate)
	
router.route('/users/:id/friends/requests/:requestId')
  .put(secureRoute, users.friendRequestAccept)
  .delete(secureRoute, users.rejectRequest)

router.route('/users/:id/balance')
  .get(balance.show)
  .put(balance.change)

router.route('/users/:id')
	

module.exports = router