
const User = require("../models/User");

// Create a POST endpoint to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, role, country, password } = req.body;

        // Check if user exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(403).send({ message: 'User already exists.' });
        }

        // Create a new user object
        const newUser = new User({
            name,
            email,
            mobile,
            role,
            country,
            password
        });

        // Save the new user object to the database
        await newUser.save();

        // // Send a response to the client
        return res.status(200).json({ message: "Registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error.' });
    }
};

// User login API
const loginUser = async (req, res) => {
    const { email, password } = req.query;
    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).send({ message: "Please enter correct email" });
    }
    if (user.password != password) {
        return res.status(404).send({ message: "Please enter correct password" });
    }
    if (user.role == 'purchaser') {
        return res.status(200).json({ message: "Logged in successfully, Directed to purchaser dashboard" });
    }
    return res.status(200).json({ message: "Logged in successfully, Directed to provider dashboard" });

}

//// Fetch all Users details
const getAllUsers = async (req, res) => {
    try {
        const userList = await User.find(req.query);
        return res.status(200).json(userList);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: "Users details not found" });
    }
};

// get user by email
const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Upadte user details - based on email (we don't have accountId as of now)
// const updateUserDetails = async (req, res) => {
//     try {
//         const { name, email, country, mobile } = req.body;
//         const user = await User.find({ accountId: accountId });
//         if (!user) {
//             return res.status(404).json({ message: "User does not exist with the given email address" });
//         }
//         const updateUserDetails = await User.findOneAndUpdate({ email: email }, { name: name, country: country, mobile:mobile });
//         return res.status(200).json({ message: "Updated user details" });

//     } catch (err) {
//         return res.status(500).json({ message: "Failed to update user details" });
//     }
// }

// delete user by ID
const deleteUserByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const user = await User.findOneAndDelete({ email: email });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete" });
    }
}

// Get provider list
const getProviderList = async (req, res) => {
    try {
        const role = req.query.role;
        const providers = await User.find({ role: role });
        if (!providers) {
            return res.status(404).json({ message: "No provider list found" });
        }
        return res.status(200).json(providers);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

module.exports = { registerUser, loginUser, getAllUsers, getUserByEmail, deleteUserByEmail, getProviderList };