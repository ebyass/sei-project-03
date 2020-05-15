const router = require('express').Router()
const auth = require('../controllers/auth')
const users = require('../controllers/users')


router.route('/register')
  .post(auth.register)
	
router.route('/users')
  .get(users.index)
	
	
module.exports = router