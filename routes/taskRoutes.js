const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Show tasks with pagination and search
router.get('/', taskController.getTasks);
// Show Add Form
router.get('/add', taskController.showAddForm);

// Add Task
router.post('/add', taskController.createTask);
// Delete Task
router.delete('/delete/:id', taskController.deleteTask);

// Show Edit Form
router.get('/edit/:id', taskController.showEditForm);

// Update Task
router.put('/edit/:id', taskController.updateTask);

module.exports = router;