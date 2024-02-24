const router = require("express").Router();
const path = require('path');
const applicationStageController = require(path.resolve(CONTROLLER_DIR, 'applicationStage'));

router.route('/')
  .post(applicationStageController.create)
  .get(applicationStageController.search);

router.route('/:id')
  .get(applicationStageController.find)
  .put(applicationStageController.update)
  .delete(applicationStageController.delete);

module.exports = router;
