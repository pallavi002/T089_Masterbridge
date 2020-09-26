const mongoose = require("mongoose");

const Course = new mongoose.Schema({
    coursename: {
        type: String
    },
    description: {
        type: String
    },
    prerequisites: {
        type: String
    },
    hours: {
        type: String
    },
    videos: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Course", Course);