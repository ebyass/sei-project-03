const router = require('express').Router()
const auth = require('../controllers/auth')
const users = require('../controllers/users')


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
	
module.exports = router