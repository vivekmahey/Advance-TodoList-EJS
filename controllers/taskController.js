const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    // pass empty filters so tasks.ejs doesn't error when expecting them
    res.render('tasks', {
      tasks,
      searchQuery: '',
      statusFilter: '',
      priorityFilter: '',
      currentPage: 1,
      totalPages: 1
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server Error');
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, deadline, status, priority, followup } = req.body; // ✅ change discription → description
    const mainImage = req.file ? req.file.filename : null;

    const newTask = new Task({
      title,
      description, // ✅ match schema
      deadline,
      status,
      priority,
      followup,
      mainImage
    });

    await newTask.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Server Error');
  }
};


const showEditForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.render('edit', { task });
  } catch (err) {
    console.error('Error showing edit form:', err);
    res.status(500).send('Server Error');
  }
};

const editTask = async (req, res) => {
  try {
    const { title, description, deadline, status, priority, followup } = req.body; // ✅ same here
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');

    task.title = title;
    task.description = description; // ✅ match schema
    task.deadline = deadline;
    task.status = status;
    task.priority = priority;
    task.followup = followup;

    if (req.file) task.mainImage = req.file.filename;

    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Server Error');
  }
};


const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    res.render("taskDetails", { task });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).send("Server Error");
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    await task.deleteOne();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTasks,
  addTask,
  showEditForm,
  editTask,
  deleteTask,
  getTaskById
};
