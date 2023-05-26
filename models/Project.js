const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    jobCode:{
        type: Number,
        unique: true,
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    requirements:{
        type: String,
        required: true
    },
    skillsRequired:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        default:null
    }

});

module.exports = mongoose.model("Project", projectSchema);