const express=require("express");
const router=express.Router();

const {registerUser,loginUser,getAllUsers}=require('../controllers/user');
// Register user
router.route("/addUser").post(registerUser);

// Login user
router.route("/loginUser").get(loginUser);

// Get All users
router.route("/getUsers").get(getAllUsers);

module.exports=router;
