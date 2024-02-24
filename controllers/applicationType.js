
const path = require('path');
const ApplicationType = require(path.resolve(DB_MODEL,'applicationType')); 
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
module.exports = {
  create: async (req, res) => {
    await dbconnect();
    try {
      let newResource = await ApplicationType.create(req.body);

      res.status(201).json({ message: newResource._id });
    } catch (err) {
      console.log(`Error while creating application type`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  find: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await ApplicationType.findById(resourceId);

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ data: resource });
    } catch (err) {
      console.log(`Error while finding application type`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;
      let resource = await ApplicationType.findByIdAndUpdate(
        resourceId,
        req.body
      );

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`Error while updating application type`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  delete: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await ApplicationType.findByIdAndDelete(resourceId);

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(`Error while deleting application type`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  search: async (req, res) => {
    await dbconnect();
    try {
      let resources = await ApplicationType.find();
      res.status(200).json({ count: resources.length, data: resources });
    } catch (err) {
      console.log(`Error while searching application type`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
