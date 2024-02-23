

const router = require("express").Router()

const path = require('path');

const UserController  = require(path.resolve(CONTROLLER_DIR,'user'))

router.post('/login',UserController.login);

router.post('/signup' ,UserController.signup)
module.exports = router;    