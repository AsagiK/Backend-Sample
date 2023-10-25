const cron = require('node-cron');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const weather = require('./models/weather')
const logger = require('./config/winston-config.js')
//instantiate validator middleware
const validator = require('./middleware/validatorMiddleware')
// Load environment variables
dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


// Function to generate random weather data
function generateWeatherData() {
    const data = new weather({
        timestamp: new Date(), // current time
        location: `Location${Math.floor(Math.random() * 3) + 1}`, // random location
        temperature_celsius: (Math.random() * 15) + 20, // random temperature between 20 and 35
        humidity_percent: Math.floor(Math.random() * 100), // random humidity
        pressure_hpa: Math.floor(Math.random() * 50) + 970 // random pressure between 970 and 1020
    });
    return data;
}

// Scheduled task for sensor data simulation
// This cron job is set to run every 10 mins.
cron.schedule('*/10 * * * *', async function() {
    console.log('Generating simulated sensor data...');
    
    // Create new sensor data
    const newWeatherData = generateWeatherData();
    
    // Save this data to your database
    //rewrote this from the original callback into try/catch since save() no longer accepts callbacks
    //added logger for the sensor
    try{
        const weatherData = await newWeatherData.save()
        logger.info(`Data inserted from weather sensor`);
        //function GenerateWarningsandNotify takes in weather data and validates it via joi, if any thresholds are met it calls nodemailer to notify
        validator.generateWarningsandNotify(weatherData)
        
    } catch (err){
        //console.error('Error inserting simulated data:', err);
        logger.error(`Error inserting simulated data:, ${err}`)
    }
});


// Keep the script running
setInterval(() => {}, 1000);