const express = require("express");
const router = express.Router();
const multer = require("multer");
const taskController = require("../controllers/taskController");


// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

router.get("/", taskController.getTasks);
router.get("/edit/:id", taskController.showEditForm);
router.post("/edit/:id", taskController.editTask);
router.post("/delete/:id", taskController.deleteTask);


const upload = multer({ storage });

router.post("/add", upload.single("mainImage"), taskController.addTask);

module.exports = router;
