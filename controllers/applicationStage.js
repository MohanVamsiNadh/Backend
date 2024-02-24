

const path = require('path');
const ApplicationStage = require(path.resolve(DB_MODEL,'applicationStage')); 
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
module.exports = {
  create: async (req, res) => {
    await dbconnect();
    try {
      let newResource = await ApplicationStage.create(req.body);

      res.status(201).json({ message: newResource._id });
    } catch (err) {
      console.log(`Error while creating application stage`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  find: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await ApplicationStage.findById(resourceId);

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ data: resource });
    } catch (err) {
      console.log(`Error while finding application stage`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;
      let resource = await ApplicationStage.findByIdAndUpdate(
        resourceId,
        req.body
      );

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`Error while updating application stage`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  delete: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await ApplicationStage.findByIdAndDelete(resourceId);

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(`Error while deleting application stage`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  search: async (req, res) => {
    await dbconnect();
    try {
      let resources = await ApplicationStage.find();
      res.status(200).json({ count: resources.length, data: resources });
    } catch (err) {
      console.log(`Error while searching application stage`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
