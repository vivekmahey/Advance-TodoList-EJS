const express = require("express");
const router = express.Router();

// Protect this route so only logged-in users can see it
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect("/login");
}

router.get("/app", isAuthenticated, (req, res) => {
    res.render("app", { user: req.session.user });
});

module.exports = router;
