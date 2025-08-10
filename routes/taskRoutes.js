const express = require('express');
const router = express.Router();
const multer = require('multer');
const taskController = require('../controllers/taskController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
router.get('/', taskController.getTasks);
router.get('/add', (req, res) => res.render('addTask'));
router.post('/add', upload.single('mainImage'), taskController.addTask);
router.get('/edit/:id', taskController.showEditForm);
router.post('/edit/:id', upload.single('mainImage'), taskController.editTask);
router.post('/delete/:id', taskController.deleteTask);
router.get("/:id", taskController.getTaskById);

module.exports = router;
