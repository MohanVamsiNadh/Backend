
const path = require('path');
const SendMail = require('../utils/sendmail');
const UserApplication = require(path.resolve(DB_MODEL,'userApplication')); 
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
const ApplicationStage = require(path.resolve(DB_MODEL,'applicationStage')); 
const User = require(path.resolve(DB_MODEL, 'user'));
module.exports = {
  create: async (req, res) => {
    await dbconnect();
    try {

      let firstStage = await ApplicationStage.findOne({applicationType:req.body.application_typeId ,order:1})
  
      req.body.currentStage = firstStage._id
      let newResource = await UserApplication.create(req.body);
      let userId = req.query.userId
      let user= await User.findById(userId)
      await   SendMail('thank you for applying ' , user.email, "Application Received")
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
    
     
     

      let applicationDoc  =await UserApplication.findById(resourceId).populate('currentStage')

      let user= await User.findById(applicationDoc.userId)
      if ( req.body.status == 'rejected')
      {
        let resource = await UserApplication.findByIdAndUpdate(
          resourceId,
          {status: 'rejected'}
        );

        await   SendMail('application rejected sorry to inform ' , user.email, "Application rejected")
        return res.status(201).json({message: "updated"})

      }
      else if (req.body.status == 'approved') {

        let allStages =  await ApplicationStage.find({applicationType:applicationDoc.application_typeId})
       
        

        let nextStage = allStages.filter((s) => s.order == applicationDoc.currentStage.order+1)
       

        if (nextStage.length != 0 ){

          applicationDoc.currentStage = nextStage[0]._id
          applicationDoc.save()
          return res.status(200).json({message:'updated'})
        }

        applicationDoc.status = 'approved'
        applicationDoc.save()
        await   SendMail(' application approved ' , user.email, "Application approved")
        return res.status(200).json({})
      }
      
      let resource = await UserApplication.findByIdAndUpdate(
        resourceId,
        req.body
      );

      if (resource == null) {
        res.status(404).json({ message: "not found" });
        return;
      }
      res.status(201).json({ message: "updated successfully" });
    } catch (err) {
      console.log(`Error while updating user application`);
      res.status(500).json({ message: "internal server error"+ err });
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

      const filters = { 
        ...(req.query.userId && { userId: req.query.userId }),
      
    };
  

    if (req.query.roleId){

      // for others  than 

      let allApplications = await UserApplication.find({}).populate('currentStage').populate('userId').populate('application_typeId')

      let filteredApplications= allApplications.filter((application) => application.currentStage.roleId == req.query.roleId && application.status !=  'rejected' && application.status != 'approved')
      return res.status(200).json({data : filteredApplications})
    }

      
      let resources = await UserApplication.find(filters).populate('application_typeId').populate('currentStage');


      res.status(200).json({ count: resources.length, data: resources });
    } catch (err) {
      console.log(`Error while searching user application`);
      res.status(500).json({ message: "internal server error" + err});
    }
  },
};
