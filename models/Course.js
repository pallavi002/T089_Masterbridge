const mongoose = require("mongoose");

const Course = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
    },
    students: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }],
}, { timestamps: true });

module.exports = mongoose.model("Course", Course);