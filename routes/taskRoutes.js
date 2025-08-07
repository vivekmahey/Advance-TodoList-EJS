const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.getTasks);
router.post("/add", taskController.addTask);
router.get("/edit/:id", taskController.showEditForm);
router.post("/edit/:id", taskController.editTask);
router.post("/delete/:id", taskController.deleteTask);

module.exports = router;
