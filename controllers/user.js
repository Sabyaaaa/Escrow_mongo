
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
            password,
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
    
    if(!user){
        return res.status(404).send({message:"Please enter correct email"});
    }
    if(user.password!=password){
        return res.status(404).send({message:"Please enter correct password"});
    }
    if (user.role=='purchaser') {
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


module.exports={registerUser,loginUser,getAllUsers};