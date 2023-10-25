const express = require('express');
const { body } = require('express-validator');
const Weather = require('../models/weather');
const validateRules = require('../middleware/validatorMiddleware').validateRules;
const validator = require('../middleware/validatorMiddleware');
const router = express.Router();

// Validation rules
const weatherValidationRules = [
    body('location').isLength({ min: 5 }),
    body('temperature_celsius').isInt({ gt: 0 }),
    body('humidity_percent').isInt({ gt: 0 }),
    body('pressure_hpa').isInt({ gt: 0 })
];

// CREATE a new weather entry
router.post('/', weatherValidationRules, validateRules, async (req, res, next) => {
    try {
        const weather = new Weather(req.body); 
        if(!req.body.timestamp){ //if no timestamp is provided in the POST body, generate new timestamp as now
            weather.timestamp = new Date();
        }
        const weatherData = await weather.save();
        //send user generated sensor data to validator middleware
        validator.generateWarningsandNotify(weatherData)
        res.status(201).json(weatherData);

    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
});

// READ weather entry based on location
router.get('/:location', weatherValidationRules, validateRules, async (req, res, next) => {
    try {
        const loc = req.params.location; //use query params as find argument
        const weatherData = await Weather.find({ location: loc }).sort({ createdAt: 1 }).limit(10)
        res.status(200).json(weatherData);
    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
});

//READ last 10 recent entries
router.get('/', weatherValidationRules, validateRules, async (req, res, next) => {
    try {
        const weatherData = await Weather.find().sort({ createdAt: 1 }).limit(10) //sort createdAt field, limited to 10 results
        res.status(200).json(weatherData);
    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
});

// UPDATE weather entry, uses the requst body, returns 404 not found if id does not match
router.put('/', weatherValidationRules, validateRules, async (req, res, next) => {
    try {
        const updatedWeatherData = new Weather(req.body)
        const weatherData = await Weather.findByIdAndUpdate(req.body.id, updatedWeatherData) //query database and check if existing record exists by id, then update if match
        if(weatherData){
            res.status(200).json(weatherData); // returns document before the update
        }else{
            res.status(404).send()
        }
    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
});

// DELETE weather entry, uses the object id in the query string, returns 404 not found if id does not match
router.delete('/:id', weatherValidationRules, validateRules, async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedWeatherlog = await Weather.findByIdAndDelete(id) //query database and check if existing record exists by id, then delete if match
        if(deletedWeatherlog){
            res.status(200).json(deletedWeatherlog);
        }else{
            res.status(404).send()
        }
    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
});


module.exports = router;