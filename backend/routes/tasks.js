// main microservice route

const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/search', async (req, res) => {
    try {
        const { title } = req.query
        
        // extract individual words from query
        const searchWords = title.trim().split(/\s+/)
        
        // setup case-insensitive regex patterns for each word
        const regexPatterns = searchWords.map(word => new RegExp(word, 'i'))
        
        // find tasks where title contains any of the search words
        const tasks = await Task.find({
            title: { $in: regexPatterns }
        })
        
        // for debugging, can be removed:
        console.log(`Search for "${title}" found ${tasks.length} results`)
        
        res.json({ results: tasks })
        
    } catch (error) {
        console.error('Search error:', error)
        res.status(500).json({ error: 'Search failed' })
    }
})

// Get all tasks (for debugging)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        console.log(`Found ${tasks.length} total tasks in database`)
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' })
    }
})

module.exports = router