const nodemailer = require('nodemailer')
module.exports ={
    MONGO_URI:process.env.MONGO_URI ,
    ENVIRONMENT:process.env.ENV_TYPE,
    SECRETKEY:process.env.SECRET_KEY,
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey:process.env.AWSSECRET_KEY,
    region:process.env.REGION,
    transporter: nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
         user: process.env.Google_Mail ,
         pass: process.env.Google_Password,
        },
       })
}