// MongoDB model for Task documents

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    group_name: { type: String, required: true },
    date: { type: String, required: true },
    priority: { type: Number, required: true },
    description: { type: String, required: true }
},{
  collection: 'search-title'  // TODO: Hana, update this with the collection's real name
})

module.exports = mongoose.model('Task', taskSchema)