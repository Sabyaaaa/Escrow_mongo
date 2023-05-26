const mongoose = require("mongoose");

const terms_condSchema = new mongoose.Schema({
    tc_id:{
        type: Number,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    ms_id:{
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("Terms_cond", terms_condSchema);