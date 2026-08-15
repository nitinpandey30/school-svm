const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactRoute = require('../src/routes/contact.route');
const eventRoute = require('../src/routes/events.route');
const galleryRoute = require('../src/routes/gallery.route');


const app = express()


// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan())



// routes
app.use("/api/contact",contactRoute )
app.use("/api/event", eventRoute)
app.use("/api/gallery", galleryRoute)



module.exports = app