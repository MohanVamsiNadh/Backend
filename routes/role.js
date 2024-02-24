const router = require("express").Router();
const path = require('path');
const roleController = require(path.resolve(CONTROLLER_DIR, 'role'));


router.route('/')
  .post(roleController.create)
  .get(roleController.search);

router.route('/:id')
  .get(roleController.find)
  .put(roleController.update)
  .delete(roleController.delete);

module.exports = router;