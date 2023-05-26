const Terms_cond = require("../models/Terms_cond");
const Milestone = require("../models/Milestone");

const addTermsandConditions = async (req, res) => {
    try {
        const { tc_id, description, ms_id } = req.body;

        // check if the given milestone id exists or not
        const milestone = await Milestone.findOne({ ms_id: ms_id });
        if (!milestone) {
            return res.status(404).json({ message: "No Milestone exists with the given Id" });
        }

        // create new Terms and conditions
        const tnc = new Terms_cond({
            tc_id, description, ms_id
        });

        await tnc.save();
        return res.status(200).json({ message: "Terms and Conditions saved successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error saving Terms and Conditions" });
    }
};

// Delete terms and conditions by tc_id
const deleteTermsAndConditionsById = async (req, res) => {
    try {
        const { tc_id } = req.params;
        await Terms_cond.findOneAndDelete({ tc_id: tc_id });
        return res.status(200).json({ message: "Terms and conditions deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting" });
    }
};

// Get all terms and conditions list
const getAllTC = async (req, res) => {
    try {
        const tcList = await Terms_cond.find(req.query);
        if (!tcList) {
            return res.status(404).json({ message: "No Terms and conditions found" });
        }
        return res.status(200).json(tcList);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occoured while fetching terms and conditions list" });
    }
};


module.exports = { addTermsandConditions, deleteTermsAndConditionsById, getAllTC };