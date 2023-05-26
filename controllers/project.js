const Project = require("../models/Project");

// create a new JOB
const createNewJob = async (req, res) => {
    try {
        const { jobCode, title, category, description, requirements, skillsRequired, notes } = req.body;

        // check if the Job is already existing in the DB
        const existingJob = await Project.findOne({ jobCode: jobCode });
        if (existingJob) {
            return res.status(403).json({ message: "Job already exists" });
        }

        // Create a new Job
        const newJob = new Project({
            jobCode, title, category, description, requirements, skillsRequired, notes
        });

        await newJob.save();
        // console.log(newJob);

        return res.status(200).json({ message: "Job created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while creating the job" });
    }
};

// Get all JOBS
const getAllJobs = async (req, res) => {
    try {
        const jobList = await Project.find(req.query);
        if (!jobList) {
            return res.status(404).json({ message: "No Jobs found" });
        }
        return res.status(200).json(jobList);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "An error occoured while fetching job list" });
    }
};

// Update project details
const updateProjectDetails = async (req, res) => {
    try {
        const { jobCode, ...updatedFields } = req.body;
    
        const project = await Project.findOne({ jobCode });
    
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
    
        // Update editable fields
        const { title, category, description, requirements, skillsRequired, notes } = updatedFields;
    
        project.title = title || project.title;
        project.category = category || project.category;
        project.description = description || project.description;
        project.requirements = requirements || project.requirements;
        project.skillsRequired = skillsRequired || project.skillsRequired;
        project.notes = notes || project.notes;
    
        // Save the updated project details
        await project.save();
    
        return res.status(200).json({ message: "Updated project details" });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating project" });
      }
    // try {
    //     const { jobCode, title, category, description, requirements, skillsRequired, notes } = req.body;
    //     const project = await Project.findOne({ jobCode: jobCode});
    //     if(!project) {
    //         return res.status(404).json({message: "Project not found"});
    //     }
    //     const updatedProjectDetails = await Project.findOneAndUpdate({jobCode: jobCode}, {title: title, description: description, category: category, requirements: requirements,skillsRequired: skillsRequired, notes: notes});

    //     return res.status(200).json({message: "Updated project details"});
    // }catch(err){
    //     console.error(err);
    //     return res.status(500).json({message:"An error occurred while updating project"});
    // }
};

// Delete project/job by ID
const deleteProjectByID = async (req, res) => {
    try{
        const {jobCode} = req.params;
        const project = await Project.findOneAndDelete({jobCode:jobCode});
        return res.status(200).json({message: "Project deleted successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: "An error occurred while deleting"});
    }
}

module.exports = { createNewJob, getAllJobs, updateProjectDetails, deleteProjectByID };