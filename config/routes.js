const router = require('express').Router()
const auth = require('../controllers/auth')
const users = require('../controllers/users')
const secureRoute = require('../lib/secureRoute')
const expenses = require('../controllers/expenses')

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

router.route('/friends/:id')
  .post(secureRoute, users.friend)
	
module.exports = router