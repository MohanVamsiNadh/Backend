const path = require('path');
const Role = require(path.resolve(DB_MODEL,'role')); 
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
module.exports = {
  create: async (req, res) => {
    await dbconnect();
    try {
      let newRole = await Role.create(req.body);

      res.status(201).json({ message: newRole._id });
    } catch (err) {
      console.log(`Error while creating role`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  find: async (req, res) => {
    await dbconnect();
    try {
      let roleId = req.params.id;

      let role = await Role.findById(roleId);

      if (role == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ data: role });
    } catch (err) {
      console.log(`Error while finding role`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  update: async (req, res) => {
    await dbconnect();
    try {
      let roleId = req.params.id;
      let role = await Role.findByIdAndUpdate(roleId, req.body);

      if (role == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(200).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`Error while updating role`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  delete: async (req, res) => {
    await dbconnect();
    try {
      let roleId = req.params.id;

      let role = await Role.findByIdAndDelete(roleId);

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      console.log(`Error while deleting role`);
      res.status(500).json({ message: "internal server error" });
    }
  },

  search: async (req, res) => {
    await dbconnect();
    try {
      let roles = await Role.find();
      res.status(200).json({ count: roles.length, data: roles });
    } catch (err) {
      console.log(`Error while searching roles`);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
