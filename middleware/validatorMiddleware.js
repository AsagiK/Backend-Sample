const { validationResult } = require('express-validator');
//Instantiate Joi and allow unknown keys as mongoose will create keys for id, createdat, and updatedat
const Joi = require('joi').defaults((schema) => schema.options({
    allowUnknown: true 
}));
const nodemailer = require('./mailerMiddleware')
const logger = require('../config/winston-config')


//define target thresholds in Joi schema
const weatherSchema = Joi.object({
    timestamp: Joi.string()
        .min(3)
        .required(),

    location: Joi.string()
        .required(),

    temperature_celsius: Joi.number() //warn on 23 or lower and 28 or higher
        .min(23)
        .max(28)
        .messages({
            'number.min': `Temperature sensor has reached minimum threshold`,
            'number.max': `Temperature sensor has reached maximum threshold`
          }),

    humidity_percent: Joi.number() //warn on 20 or lower and 80 or higher
        .min(20)
        .max(80)
        .messages({
            'number.min': `Humidity sensor has reached minimum threshold`,
            'number.max': `Humidity sensor has reached maximum threshold`
          }),

    pressure_hpa: Joi.number() //warn on 990 or lower and 1110 or higher
        .min(990)
        .max(1110)
        .messages({
            'number.min': `Barometer sensor has reached minimum threshold`,
            'number.max': `Barometer sensor has reached maximum threshold`
          }),
})

const validateRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateRules: validateRules,
    generateWarningsandNotify: async function(weatherData){
        {
            try{
                //validate weather data, if any thresholds are met, parse the error message, create a log entry, and send email via nodemailer
                await weatherSchema.validateAsync(weatherData);
            }catch(error){
                const errors = {};
                error.details.forEach(error => {
                  errors[error.path[0]] = error.message
                })
                errorMessages = JSON.stringify(errors)
                nodemailer.Notify(weatherData, errorMessages)
                logger.info(`Weather sensor reached thresholds:, ${errorMessages}`)
            }
        }
    }
};