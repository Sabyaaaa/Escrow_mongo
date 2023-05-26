const Milestone = require("../models/Milestone");
const Project = require("../models/Project");

const createNewMilestone = async (req, res) => {
    try {
        const { ms_id, title, dueDate, description, requirements, fund_allocation, jobCode } = req.body;

        // Job code should be existing
        const project = await Project.findOne({ jobCode: jobCode });
        if (!project) {
            return res.status(404).json({ message: "You cannot create a milestone for a jobcode that does not exist." });
        }

        // check if the milestone is already existing in the database
        const existingMilestone = await Milestone.findOne({ms_id: ms_id});
        if (existingMilestone) {
            return res.status(403).json({ message: "Milestone already exists" });
        }

        // create new milestone
        const newMilestone = new Milestone({
            ms_id, title, dueDate, description, requirements, fund_allocation, jobCode
        });

        await newMilestone.save();
        return res.status(200).json({ message: "Milestone saved successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while saving milestone" });
    }
};

// Get all milestone 
const getMilestoneList = async (req, res) => {
    try {
        const milestoneList = await Milestone.find(req.query);
        if (!milestoneList) {
            return res.status(404).json({ message: "No milestones found" });
        }
        return res.status(200).json(milestoneList);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occoured while fetching milestones list" });
    }
};

// update milestone details
const updateMSDetails = async (req, res) => {
    // update as many fields as possible
    try {
        const { ms_id, ...updatedFields } = req.body;

        const milestone = await Milestone.findOne({ ms_id: ms_id});

        if (!milestone) {
            return res.status(404).json({ message: "Milestone not found" });
        }

        // Update editable fields
        const { title, dueDate, description, requirements, fund_allocation, jobCode } = updatedFields;

        milestone.title = title || milestone.title;
        milestone.dueDate = dueDate || milestone.dueDate;
        milestone.description = description || milestone.description;
        milestone.requirements = requirements || milestone.requirements;
        milestone.fund_allocation = fund_allocation || milestone.fund_allocation;
        milestone.jobCode = jobCode || milestone.jobCode;

        // Save the updated milestone details
        await milestone.save();

        return res.status(200).json({ message: "Updated milestone details" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating milestone details" });
    }

    // update all the fields (mandatory).
    // try {
    //     const { id, title, dueDate, description, requirements, fund_allocation, jobCode } = req.body;
    //     const milestone = await Milestone.findOne({ id: id});
    //     if(!milestone) {
    //         return res.status(404).json({message: "Milestone not found"});
    //     }
    //     const updateMSDetails = await Milestone.findOneAndUpdate({id: id}, {title: title, description: description, dueDate: dueDate, requirements: requirements,fund_allocation:fund_allocation, jobCode: jobCode});

    //     return res.status(200).json({message: "Updated milestone details"});
    // }catch(err){
    //     console.error(err);
    //     return res.status(500).json({message:"An error occurred while updating milestone details"});
    // }
};

// Delete milestone by ID
const deleteMSById = async (req, res) => {
    try{
        const {ms_id} = req.params;
        const milestone = await Milestone.findOneAndDelete({ms_id:ms_id});
        return res.status(200).json({message: "Milestone deleted successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "An error occurred while deleting"});
    }
};



module.exports = { createNewMilestone, getMilestoneList, updateMSDetails, deleteMSById };