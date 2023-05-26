const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    ms_id:{
        type:Number,
        unique:true,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    dueDate:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true,
    },
    requirements: {
        type: String,
        required:true
    },
    fund_allocation:{
        type: Number,
        required:true
    },
    jobCode: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model("Milestone", milestoneSchema);