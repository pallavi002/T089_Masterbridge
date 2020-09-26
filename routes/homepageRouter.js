const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepageController");
const courseController = require("../controllers/courseController")

router.get("/", homepageController.index);


// landingpage
router.get("/landingpage", homepageController.landingpage);


router.post("/signup", homepageController.signUp);
router.get("/signup", (req, res) => {
    res.render("register");
});
router.post("/login", homepageController.login);
router.get("/login", (req, res) => {
    res.render("login");
});


router.get("/createcourse", (req, res) => {
    res.render("createcourse");
});
router.post("/createcourse", courseController.createcourse);


router.get("/404", (req, res) => {
    res.render("404");
});
router.post("/logout", homepageController.logout);

module.exports = router;