const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    role: req.session.user ? req.session.user.role : null
  });
});


module.exports = router;
