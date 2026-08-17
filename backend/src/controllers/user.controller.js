const userModel = require('../models/user.model');

async function createUser(req, res) {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser  = await userModel.findOne({email})
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }  
    const newUser = new userModel({
      name, email, password
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully" });

  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}



module.exports = {createUser}