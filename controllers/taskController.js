// Overall Logic for the project (business logic)
// exports.getTasks         // Show all tasks (with search + pagination)
// exports.showAddForm      // Show Add Task form
// exports.createTask       // Add new task
// exports.deleteTask       // Delete a task
// exports.showEditForm     // Show Edit form
// exports.updateTask       // Update a task

const Task = require('../models/Task');

// const getTasks = async (req, res) => {
//     try{
//         const tasks =await Task.find().sort({createdAt:-1});
//         res.render('index',{tasks});
//     }
//     catch(error){
//         console.log("Error while fetching tasks: ",error);
//         res.status(500).send("Server Error !");
//     } 
// };



router.get("/", async (req, res) => {
  const searchQuery = req.query.search || "";
  const priorityFilter = req.query.priority || "";
  const statusFilter = req.query.status || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  const query = {
    title: { $regex: searchQuery, $options: "i" },
  };

  if (priorityFilter) query.priority = priorityFilter;
  if (statusFilter) query.status = statusFilter;

  const totalTasks = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.render("index", {
    tasks,
    searchQuery,
    currentPage: page,
    totalPages: Math.ceil(totalTasks / limit),
    priorityFilter,
    statusFilter,
  });
});






const addTask= async(req,res)=>{
    try{
        const { title, discription, deadline, status, priority, followup } = req.body;
         if (!title || !discription || !deadline || !status || !priority || !followup) {
         return res.status(400).send("All fields are required.");
         }

     const newTask = new Task({
      title,
      discription,
      deadline,
      status,
      priority,
      followup,
    });

    await newTask.save()
    res.redirect('/');
    }
    catch(error){
       console.log("Error while adding task:", error);
       res.status(500).send("Server Error");
    }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send("Task not found");

    await task.deleteOne();
    res.redirect("/");
  } catch (error) {
    console.log("Error while deleting task:", error);
    res.status(500).send("Server Error");
  }
};

const showEditForm = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).send("Task not found");

    res.render("edit", { task });
  } catch (error) {
    console.log("Error while showing edit form:", error);
    res.status(500).send("Server Error");
  }
};  // will show edit form

const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, discription, deadline, status, priority, followup } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send("Task not found");

    task.title = title;
    task.discription = discription;
    task.deadline = deadline;
    task.status = status;
    task.priority = priority;
    task.followup = followup;

    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log("Error while updating task:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  showEditForm,
  editTask
};