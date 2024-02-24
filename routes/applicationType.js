
const router = require("express").Router()

const path = require('path');

const applicationTypeController  = require(path.resolve(CONTROLLER_DIR,'applicationType'));

router.route('/')
  .post(applicationTypeController.create)
  .get(applicationTypeController.search);

router.route('/:id')
  .get(applicationTypeController.find)
  .put(applicationTypeController.update)
  .delete(applicationTypeController.delete);

module.exports = router; 