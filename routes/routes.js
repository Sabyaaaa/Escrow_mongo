const express=require("express");
const router=express.Router();

const {registerUser,loginUser,getAllUsers, getUserByEmail, deleteUserByEmail, getProviderList}=require('../controllers/user');
const {createNewJob, getAllJobs, updateProjectDetails, deleteProjectByID}=require("../controllers/project");
const{createNewMilestone, getMilestoneList, updateMSDetails, deleteMSById}=require("../controllers/milestone");
const{addTermsandConditions, deleteTermsAndConditionsById, getAllTC}=require("../controllers/terms_cond");

// Register user
router.route("/addUser").post(registerUser);

// Login user
router.route("/loginUser").get(loginUser);

// Get All users
router.route("/getUsers").get(getAllUsers);

// Get user by ID
router.route("/getUserByEmail").get(getUserByEmail);

// update user details
// router.route("/updateUserDetails").put(updateUserDetails);

// delete user by Id
router.route("/deleteUserByEmail/:email").delete(deleteUserByEmail);

// get provider list
router.route("/getProviderList").get(getProviderList);

// ******************** PROJECT API **********************

// create new job
router.route("/addNewJob").post(createNewJob);

// get all jobs
router.route("/getAllJobs").get(getAllJobs);

// update project details
router.route("/updateProjectDetails").put(updateProjectDetails);

// delete project details by jobCode
router.route("/deleteProject/:jobCode").delete(deleteProjectByID);

// ******************** Milestone API **********************

// create new milestone
router.route("/addMS").post(createNewMilestone);

// Get all milestone List
router.route("/getMS").get(getMilestoneList);

// update milestone details
router.route("/updateMS").put(updateMSDetails);

// Delete milestone by ID
router.route("/deleteMS/:ms_id").delete(deleteMSById);

// ******************** Terms and Conditions API **********************

// create new terms and conditions
router.route("/addTC").post(addTermsandConditions);

// delete terms and conditions by id
router.route("/deleteTC/:tc_id").delete(deleteTermsAndConditionsById);

// get all terms and conditions
router.route("/getTC").get(getAllTC);


module.exports=router;
