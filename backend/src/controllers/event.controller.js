const eventModel = require('../models/event.model');

async function createEvent(req,res) {
  try {
    const {title, description, shortDescription, date, location } = req.body;
    if (!title || !description || !shortDescription || !date || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new eventModel({
      title, description, shortDescription, date, location
    });
    await newEvent.save();
    return res
      .status(201)
      .json({ message: "Event Created Successfully" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getEvents(req,res) {
  try {
    const events = await eventModel.find();
    if (!events || events.length === 0) {
      return res.status(400).json({ error: "NO data found" });
    }
    return res.status(200).json({ message: "Success!", data: events });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function deleteEvents(req,res) {
  let id = req.params.id;
  try {
    const event = await eventModel.findByIdAndDelete(id);
    if (!event) {
      return res.status(400).json({
        message: "NO event found"
      });
    }
    return res.status(200).json({ message: "Event Deleted Successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function updateEvent(req,res) {
   let id = req.params.id;
  try {
    const {title, description, shortDescription, date, location } = req.body;
    if (!title || !description || !shortDescription || !date || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const event = await eventModel.findById(id);
    if (!event) {
      return res.status(400).json({
        message: "NO event found"
      });
    }

    const updatedEvent = await eventModel.findByIdAndUpdate(id,{title, description, shortDescription, date, location})
    if (updatedEvent) {
      return res.status(201).json({ message: "Event Updated Successfully!" });
    }
    
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {createEvent,getEvents,deleteEvents,updateEvent}