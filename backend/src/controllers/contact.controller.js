const contactModel = require("../models/contact.model");

async function createContact(req, res) {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new contactModel({
      name,
      email,
      phone,
      subject,
      message,
    });
    await newContact.save();
    return res
      .status(201)
      .json({ message: "Thank You!!, we will contact soon." });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getContact(req, res) {
  try {
    const contacts = await contactModel.find().sort({ createdAt: -1 });
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ error: "NO data found" });
    }
    return res.status(200).json({ message: "Success!", data: contacts });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

async function deleteContacts(req, res) {
  let id = req.params.id;
  try {
    const contact = await contactModel.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({
        message: "No contact found",
      });
    }
    return res.status(200).json({ message: "Contact Deleted Successfully!" });
  } catch (error) {
    console.log("error: ", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = { createContact, getContact, deleteContacts };
