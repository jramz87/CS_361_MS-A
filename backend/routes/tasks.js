// main microservice route

const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/search', async (req, res) => {
    try {
        const { title } = req.query
        
        // Log the incoming request
        console.log('\n=== MICROSERVICE REQUEST RECEIVED ===')
        console.log('Timestamp:', new Date().toISOString())
        console.log('Endpoint: GET /api/tasks/search')
        console.log('Search query received:', title)
        console.log('Request from:', req.get('origin') || 'localhost')
        
        // extract individual words from query
        const searchWords = title.trim().split(/\s+/)
        console.log('Search words parsed:', searchWords)
        
        // setup case-insensitive regex patterns for each word
        const regexPatterns = searchWords.map(word => new RegExp(word, 'i'))
        console.log('Regex patterns created for database query')
        
        // find tasks where title contains ALL of the search words
        console.log('Querying MongoDB database...')
        const tasks = await Task.find({
            $and: regexPatterns.map(pattern => ({
                title: { $regex: pattern }
            }))
        })
        
        // Log the database response
        console.log('Database query completed')
        console.log('Tasks found in database:', tasks.length)
        if (tasks.length > 0) {
            console.log('Matching tasks:')
            tasks.forEach((task, index) => {
                console.log(`  ${index + 1}. "${task.title}" (ID: ${task._id})`)
            })
        } else {
            console.log('No matching tasks found')
        }
        
        // Prepare response
        const response = { results: tasks }
        console.log('\n=== MICROSERVICE SENDING RESPONSE ===')
        console.log('Response data:', JSON.stringify(response, null, 2))
        console.log('Response sent successfully to client')
        console.log('=====================================\n')
        
        res.json(response)
        
    } catch (error) {
        console.error('\n=== MICROSERVICE ERROR ===')
        console.error('Error occurred:', error.message)
        console.error('Stack trace:', error.stack)
        console.error('========================\n')
        res.status(500).json({ error: 'Search failed' })
    }
})

// Get all tasks (for debugging)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        console.log(`\n=== DEBUG: All tasks request ===`)
        console.log(`Found ${tasks.length} total tasks in database`)
        console.log('===============================\n')
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
})

module.exports = router