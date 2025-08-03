// Express server for MongoDB task search microservice

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('../config.js')  // Import config
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || config.backend.port  // Use config value

// Use config values for CORS
app.use(cors({
    origin: config.backend.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// connect to MongoDB - use config value
mongoose.connect(process.env.MONGODB_URI || config.backend.mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

// main microservice routes (in ./routes/tasks.js)
const taskRoutes = require('./routes/tasks')
app.use('/api/tasks', taskRoutes)

// health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Task Search Microservice is running!' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})