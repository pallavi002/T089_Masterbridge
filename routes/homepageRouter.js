const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepageController");
const courseController = require("../controllers/courseController");

const courses = [
  {
    courseName: "Art of war",
    teacher: 'Muppala',
    courseLink: 'https://www.google.com',
    courseImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    courseName: "Stoicism",
    teacher: 'Ramesh',
    courseLink: 'https://www.google.com',
    courseImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
];

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
router.get("/courseDB", (req, res) => {
  res.render("courseDB", { courses });
});
router.post("/createcourse", courseController.createcourse);

router.post("/enroll/id", homepageController.enroll);

router.get("/404", (req, res) => {
  res.render("404");
});
router.post("/logout", homepageController.logout);

module.exports = router;
