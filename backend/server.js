// Express server for MongoDB task search microservice

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000


// set appropriate CORS vars in .env
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}))
app.use(express.json())

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskdb')
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