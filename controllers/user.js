

const path = require('path');
const UserModal = require(path.resolve(DB_MODEL,'user'))
const RoleModal = require(path.resolve(DB_MODEL,'role'))
const dbconnect = require(path.resolve(__dirname,'..','dbconnect'))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {

    signup : async (req,res)=>{


        try {
            await dbconnect()
            const { name, email, password } = req.body;
        

            // check whether user exist or not
            const Existuser = await UserModal.findOne({ email });
        
            if (Existuser) {
              return res.status(400).json({ message:'user already exist' });
            }
            // Assign default role 'user'
            const defaultRole = 'user';
        
            // Check if the default role exists, if not, create it
            let role = await RoleModal.findOne({ name: defaultRole });
        
            if (!role) {
              role = new RoleModal({ name: defaultRole });
              await role.save();
            }
        
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create user with default role
            const user = new UserModal({
              name,
              email,
              password: hashedPassword,
              roles: [role._id],
            });
        
            await user.save();
        
            res.status(201).json({ message: 'User created successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },
    login : async (req,res) =>{

        try {
           await   dbconnect()
            const { email, password } = req.body;
            const user = await UserModal.findOne({ email });
        
            if (!user) {
              return res.status(401).json({ error: 'Invalid credentials' });
            }
        
            const isValidPassword = await bcrypt.compare(password, user.password);
        
            if (!isValidPassword) {
              return res.status(401).json({ error: 'Invalid credentials' });
            }
        
            // Generate JWT token with user ID and role, set to expire in 7 days
            const token = jwt.sign({ userId: user._id, role: user.roles }, __configurations.SECRETKEY, { expiresIn: '7d' });
        
            res.status(200).json({  token });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }
}