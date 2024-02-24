
const path = require('path');
const UserApplication = require(path.resolve(DB_MODEL,'userApplication')); 
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))

module.exports = {
  create: async (req, res) => {
    await dbconnect();
    try {
      let newResource = await UserApplication.create(req.body);

      res.status(201).json({ message: newResource._id });
    } catch (err) {
      console.log(`Error while creating user application`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  find: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await UserApplication.findById(resourceId);

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ data: resource });
    } catch (err) {
      console.log(`Error while finding user application`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;
      let resource = await UserApplication.findByIdAndUpdate(
        resourceId,
        req.body
      );

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`Error while updating user application`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  delete: async (req, res) => {
    await dbconnect();
    try {
      let resourceId = req.params.id;

      let resource = await UserApplication.findByIdAndDelete(resourceId);

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(`Error while deleting user application`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  search: async (req, res) => {
    await dbconnect();
    try {
      let resources = await UserApplication.find();
      res.status(200).json({ count: resources.length, data: resources });
    } catch (err) {
      console.log(`Error while searching user application`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
