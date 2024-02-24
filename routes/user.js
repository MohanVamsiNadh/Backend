const router = require("express").Router();
const path = require('path');
const UserController = require(path.resolve(CONTROLLER_DIR, 'user'));


router.post('/login', UserController.login);
router.post('/signup', UserController.signup);


router.route('/')
  .get(UserController.search)
  .post(UserController.create);

router.route('/:id')
  .get(UserController.find)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
