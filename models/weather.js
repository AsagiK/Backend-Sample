const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    temperature_celsius: {
        type: Number,
        required: true
    },
    humidity_percent: {
        type: Number,
        required: true
    },
    pressure_hpa: {
        type: Number,
        required: true
    },

},
{
  timestamps: true
});

const Weather = mongoose.model('Weather', weatherSchema, 'weatherlogs');
module.exports = Weather;