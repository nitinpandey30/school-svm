const noticeModel = require('../models/notice.model');

async function createNotice(req, res) {
  try {
    const { title, description, date, category} = req.body;

    if (!title || !description || !date || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newNotice = new noticeModel({
      title,
      description,
      date,
      category
    });

    await newNotice.save();

    return res
      .status(201)
      .json({ message: "Notice Created Successfully" });

  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getNotice(req,res) {
  try {
    const notices = await noticeModel.find();

    if (!notices || notices.length === 0) {
      return res.status(400).json({ error: "No data found" });
    }

    return res.status(200).json({ message: "Success!", data: notices });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function deleteNotice(req,res) {
  let id = req.params.id;
  try {
    const notice = await noticeModel.findByIdAndDelete(id);
    if (!notice) {
      return res.status(400).json({
        message: "NO notice found"
      });
    }
    return res.status(200).json({ message: "Notice Deleted Successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function updateNotice(req,res) {
   let id = req.params.id;
  try {
    const {title, description, date, category} = req.body;

    if (!title || !description || !date || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notice = await noticeModel.findById(id);

    if (!notice) {
      return res.status(400).json({
        message: "No notice found"
      });
    }

    const updatedNotice = await noticeModel.findByIdAndUpdate(id,{title, description, date, category})

    if (updatedNotice) {
      return res.status(201).json({ message: "Notice Updated Successfully!" });
    }
    
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


module.exports = {createNotice,getNotice,deleteNotice,updateNotice}