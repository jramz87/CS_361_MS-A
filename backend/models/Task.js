// MongoDB model for Task documents

const mongoose = require('mongoose')
const config = require('../../config.js')  // Import centralized config

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    group_name: { type: String, required: true },
    date: { type: String, required: true },
    priority: { type: Number, required: true },
    description: { type: String, required: true }
},{
  collection: config.backend.collectionName  // Uses config value
})

module.exports = mongoose.model('Task', taskSchema)