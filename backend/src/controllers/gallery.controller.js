const galleryModel = require('../models/gallery.model');


async function createGallery(req, res) {
  try {
    const { title, imageUrl, date } = req.body;

    if (!title || !imageUrl || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newGallery = new galleryModel({
      title,
      imageUrl,
      date,
    });

    await newGallery.save();

    return res
      .status(201)
      .json({ message: "Gallery Created Successfully" });

  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getGallery(req,res) {
  try {
    const gallery = await galleryModel.find();

    if (!gallery || gallery.length === 0) {
      return res.status(400).json({ error: "NO data found" });
    }

    return res.status(200).json({ message: "Success!", data: gallery });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function deleteGallery(req,res) {
  let id = req.params.id;
  try {
    const gallery = await galleryModel.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(400).json({
        message: "NO gallery found"
      });
    }
    return res.status(200).json({ message: "Gallery Deleted Successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function updateGallery(req,res) {
   let id = req.params.id;
  try {
    const {title,imageUrl,date} = req.body;

    if (!title || !imageUrl || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const gallery = await galleryModel.findById(id);

    if (!gallery) {
      return res.status(400).json({
        message: "NO gallery found"
      });
    }

    const updatedGallery = await galleryModel.findByIdAndUpdate(id,{title,imageUrl,date})

    if (updatedGallery) {
      return res.status(201).json({ message: "Gallery Updated Successfully!" });
    }
    
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}


module.exports = {createGallery,getGallery,deleteGallery,updateGallery}