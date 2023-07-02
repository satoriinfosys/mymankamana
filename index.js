const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.port || 5000
const app = express()
const conn = require('./db/db')
var cors = require('cors')
const fileUpload = require("express-fileupload");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(fileUpload());

app.use('/api/category', require('./routes/category.route'))
app.use('/api/team', require('./routes/team.route'))
app.use('/api/notice', require('./routes/notice.route'))
app.use('/api/event', require('./routes/event.route'))
app.use('/api/trip', require('./routes/trip.route'))
app.use('/api/query', require('./routes/query.route'))
app.use('/api/response', require('./routes/response.route'))
app.use('/api/booking', require('./routes/booking.route'))
app.use('/api/user', require('./routes/user.route'))
app.use('/api/blog', require('./routes/blog.route'))
app.use('/api/guidline', require('./routes/guidline.route'))
app.use('/api/subscription', require('./routes/subscription.route'))
app.use('/api/master', require('./routes/masterData.route'))
app.use('/api/media', require('./routes/media.route'))
app.use('/api/authentication', require('./routes/authentication.route'))

app.listen(port, () => {
    console.log(`Server running at port : ${port}`);
})