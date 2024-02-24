const nodemailer = require('nodemailer');


const  SendMail = async function(body,toEmail , subject){



    try{
        await __configurations.transporter.sendMail({
            from: process.env.Google_Mail,
            to: toEmail,
            subject: subject,
            text: body
        });
    }
    catch(err){
        console.log(`Error occured while sending mail` + err)
    }
   


}

module.exports = SendMail