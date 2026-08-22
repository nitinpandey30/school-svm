const express = require('express');
const cors = require('cors');
const contactRoute = require('../src/routes/contact.route');
const eventRoute = require('../src/routes/events.route');
const galleryRoute = require('../src/routes/gallery.route');
const noticeRoute = require('../src/routes/notice.route');
const userRoute = require('../src/routes/user.route');
const feeRoute = require('../src/routes/fee.route');


const app = express()


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())



// routes
app.use("/api/contact",contactRoute )
app.use("/api/event", eventRoute)
app.use("/api/gallery", galleryRoute)
app.use("/api/notice", noticeRoute)
app.use("/api/fee", feeRoute)
app.use("/api/user", userRoute)



module.exports = app