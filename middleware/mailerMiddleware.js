const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config();
const logger = require('../config/winston-config')

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        type: "login",
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});



module.exports ={

    Notify: function(weatherData, errorMessages){

        //prepare email body for sending
        var mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: process.env.NODEMAILER_RECIPIENT,
            subject: 'Sensor threshold warning',
            text: `Current reading:  
            ${weatherData}
            Thresholds encountered:
            ${errorMessages}`
        };
        
        //send mail and log outcome of send attempt 
        transporter.sendMail(mailOptions, (error, info) =>{
            if (error) {
              console.log(error);
              logger.error(`Error sending notification email:, ${error}`)
            } else {
              console.log('Email sent: ' + info.response);
              logger.info(`Notification email sent to ${process.env.NODEMAILER_RECIPIENT}`);
            }
        }); 
        
    }
}



