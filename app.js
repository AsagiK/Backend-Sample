require('dotenv').config();
const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes.js');
const connectDB = require('./config/db');
const handleError = require('./middleware/errorMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

// Implementing the logger middleware
app.use(loggerMiddleware);

// Routes
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use(handleError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});