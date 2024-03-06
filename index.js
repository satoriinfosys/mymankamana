const dotenv = require('dotenv').config()
const serverless = require('serverless-http');
const express = require('express')
const moment = require('moment')
const PORT = process.env.PORT ||3000
const mongoose = require('mongoose');
const app = express()
const conn = require('./db/db')
var cors = require('cors')
const fileUpload = require("express-fileupload");
const { Master_model } = require('./models/materData.model.js')
const { tokenValidator } = require('./middlewares/verify-token.middelware')



module.exports.handler = serverless(app);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
   origin: '*' ,
}));

app.use(fileUpload());

app.use('/api/category', tokenValidator, require('./routes/category.route'))
app.use('/api/team', tokenValidator, require('./routes/team.route'))
app.use('/api/notice', tokenValidator, require('./routes/notice.route'))
app.use('/api/event', tokenValidator, require('./routes/event.route'))
app.use('/api/trip', tokenValidator, require('./routes/trip.route'))
app.use('/api/query', tokenValidator, require('./routes/query.route'))
app.use('/api/response', tokenValidator, require('./routes/response.route'))
app.use('/api/booking', tokenValidator, require('./routes/booking.route'))
app.use('/api/user', tokenValidator, require('./routes/user.route'))
app.use('/api/blog', tokenValidator, require('./routes/blog.route'))
app.use('/api/guidline', tokenValidator, require('./routes/guidline.route'))
app.use('/api/subscription', tokenValidator, require('./routes/subscription.route'))
app.use('/api/master', tokenValidator, require('./routes/masterData.route'))
app.use('/api/media', tokenValidator, require('./routes/media.route'))
app.use('/api/authentication', tokenValidator, require('./routes/authentication.route'))

// Master_model.find({}, function (err, result) {
//     if (result.length == 0) {
//         var futureDate = moment().add(15, 'days');
//         var toDate = futureDate.toDate();
//         Master_table = new Master_model({ 'createdon': toDate });
//         Master_table.save((error, savedResult) => {
//         });
//     }
// });

Master_model.find({}, function (err, result) {
    if (err) {
        console.error('Error occurred while querying the database:', err);
        return;
    }
    
    if (!result || result.length === 0) {
        var futureDate = moment().add(15, 'days');
        var toDate = futureDate.toDate();
        Master_table = new Master_model({ 'createdon': toDate });
        Master_table.save((error, savedResult) => {
            if (error) {
                console.error('Error occurred while saving data:', error);
            }
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
})