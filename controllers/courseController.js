const app = require("../app");
const Course = require("../models/Course");
const User = require('../models/User');

const formidable = require("formidable");
const fs = require("fs");
const path = require("path");


//new
module.exports.createcourse = function(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (files.video.name !== '') {
            let oldpath = files.video.path;
            let newpath = './videos/' + files.video.name;
            fs.readFile(oldpath, function(err, data) {
                if (err) {
                    console.log(err);
                    res.redirect('back');
                    return;
                }

                // Write the file
                fs.writeFile(newpath, data, function(err) {
                    if (err) {
                        console.log(err);
                        res.redirect('back');
                        return;
                    }
                    fields.video = 'http://localhost:5000/' + files.video.name;
                    fields.userId = req.session.userObj._id;
                    console.log(fields.userId)
                    let coursedata = {
                        coursename: fields.coursename,
                        description: fields.description,
                        prerequisites: fields.prerequisites,
                        hours: fields.hours,
                        videos: fields.video,
                        uid: fields.userId
                    }
                    console.log("coursedata " + coursedata)
                    let course = new Course(coursedata);
                    course.save(function(err, result) {
                        if (err) {
                            console.log(err);
                            res.redirect('back');
                        } else {
                            console.log('result' + result);
                            req.flash('toastMessage', 'course Added Successfully!');
                            res.redirect('back');

                            fs.unlink(oldpath, function(err) {
                                if (err) {
                                    console.log(err);
                                    res.redirect('back');
                                    return;
                                }
                            });
                        }
                    });
                });
            });
        } else {
            var course = new Course(fields);
            course.save(function(err, result) {
                if (err) {
                    res.redirect('back');
                } else {
                    req.flash('toastMessage', 'course Added Successfully!');
                    res.render('landingpage');
                }

            });
        }
    });
}


module.exports.displaycourse = function(req, res) {
    Course.find({}, function(err, courses) {
        if (err) {
            console.log(err)
        } else {
            res.render("landingpage", {
                courses: courses
            })
        }
    })
}