const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  followup: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  mainImage: { 
    type: String 
  },

});

module.exports = mongoose.model('Task', taskSchema);
