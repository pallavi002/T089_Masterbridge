const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
        lowercase: true,
        trim: true,
    },
    contact: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true,
    },
    branch: {
        type: String,
        enum: ["CE", "EXTC", "IT", "ME", "PPT"],
        required: true,
    },
    year: {
        type: String,
        enum: ["FE", "SE", "TE", "BE"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    coursesenrolled: {
        type: String
    },
    role: {
        type: String,
        enum: ["student", "professor"]
    }
}, { timestamps: true });

module.exports = mongoose.model("User", user);