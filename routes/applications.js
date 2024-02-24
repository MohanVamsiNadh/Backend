
const router = require("express").Router()

const path = require('path');

const applicationController  = require(path.resolve(CONTROLLER_DIR,'application'));

router.route('/')
  .post(applicationController.create)
  .get(applicationController.search);

router.route('/:id')
  .get(applicationController.find)
  .put(applicationController.update)
  .delete(applicationController.delete);

module.exports = router; 