const teacherModel = require('../models/teacher.model');

async function createTeacher(req,res) {
  try {
    const { name, subject, designation, bio, image} = req.body;

    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTeacher = new teacherModel({
       name, subject, designation, bio, image
    });

    await newTeacher.save();

    return res
      .status(201)
      .json({ message: "Teacher Created Successfully" });

  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


async function getTeacher(req,res) {
  try {
    const teachers = await teacherModel.find();

    if (!teachers || teachers.length === 0) {
      return res.status(400).json({ error: "No data found" });
    }

    return res.status(200).json({ message: "Success!", data: teachers });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


async function deleteTeacher(req,res) {
  let id = req.params.id;
  try {
    const teacher = await teacherModel.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(400).json({
        message: "NO teacher found"
      });
    }
    return res.status(200).json({ message: "Teacher Deleted Successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function updateTeacher(req,res) {
   let id = req.params.id;
  try {
    const { name, subject, designation, bio, image} = req.body;

    if (!name || !subject || !designation || !bio ||!image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const teacher = await teacherModel.findById(id);

    if (!teacher) {
      return res.status(400).json({
        message: "No teacher found"
      });
    }

    const updatedTeacher= await teacherModel.findByIdAndUpdate(id,{name, subject, designation, bio, image})

    if (updatedTeacher) {
      return res.status(201).json({ message: "Teacher Updated Successfully!" });
    }
    
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


module.exports = {createTeacher,getTeacher,deleteTeacher,updateTeacher}