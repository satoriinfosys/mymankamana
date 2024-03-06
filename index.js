// const dotenv = require('dotenv').config()
// const express = require('express')
// const moment = require('moment')
// const PORT = process.env.PORT ||3000
// const mongoose = require('mongoose');
// const app = express()
// const conn = require('./db/db.js')
// var cors = require('cors')
// const fileUpload = require("express-fileupload");
// const { Master_model } = require('./models/materData.model.js')
// const { tokenValidator } = require('./middlewares/verify-token.middelware')


// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use(cors({
//    origin: ['*','https://www.mymanakamanatravels.com']
// }));

// app.use(fileUpload());

// app.use('/api/category', tokenValidator, require('./routes/category.route'))
// app.use('/api/team', tokenValidator, require('./routes/team.route'))
// app.use('/api/notice', tokenValidator, require('./routes/notice.route'))
// app.use('/api/event', tokenValidator, require('./routes/event.route'))
// app.use('/api/trip', tokenValidator, require('./routes/trip.route'))
// app.use('/api/query', tokenValidator, require('./routes/query.route'))
// app.use('/api/response', tokenValidator, require('./routes/response.route'))
// app.use('/api/booking', tokenValidator, require('./routes/booking.route'))
// app.use('/api/user', tokenValidator, require('./routes/user.route'))
// app.use('/api/blog', tokenValidator, require('./routes/blog.route'))
// app.use('/api/guidline', tokenValidator, require('./routes/guidline.route'))
// app.use('/api/subscription', tokenValidator, require('./routes/subscription.route'))
// app.use('/api/master', tokenValidator, require('./routes/masterData.route'))
// app.use('/api/media', tokenValidator, require('./routes/media.route'))
// app.use('/api/authentication', tokenValidator, require('./routes/authentication.route'))

// Master_model.find({}, function (err, result) {
//     if (result.length == 0) {
//         var futureDate = moment().add(15, 'days');
//         var toDate = futureDate.toDate();
//         Master_table = new Master_model({ 'createdon': toDate });
//         Master_table.save((error, savedResult) => {
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running at port : ${PORT}`);
// })
// module.exports.handler = serverless(app);

const dotenv = require('dotenv').config();
const express = require('express');
const moment = require('moment');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = express();
const conn = require('./db/db.js');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fetch = require('node-fetch'); // Import the fetch library
const { Master_model } = require('./models/materData.model.js');
const { tokenValidator } = require('./middlewares/verify-token.middleware');
const serverless = require('serverless-http');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ['*', 'https://www.mymanakamanatravels.com']
}));
app.use(fileUpload());

// Define a route that makes a fetch request with 'no-cors' mode
app.get('/fetch-resource', async (req, res) => {
  try {
    // Make a fetch request with 'no-cors' mode
    const response = await fetch('https://mymankamana.vercel.app/trip/get-all', { mode: 'no-cors' });
    
    // Check if the request was successful
    if (response.ok) {
      // If successful, send a success response
      res.send('Fetch request successful');
    } else {
      // If the request failed, send an error response
      res.status(response.status).send('Failed to fetch resource');
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error fetching resource:', error);
    res.status(500).send('Internal server error');
  }
});

// Your other routes
app.use('/api/category', tokenValidator, require('./routes/category.route'));
app.use('/api/team', tokenValidator, require('./routes/team.route'));
app.use('/api/notice', tokenValidator, require('./routes/notice.route'));
app.use('/api/event', tokenValidator, require('./routes/event.route'));
app.use('/api/trip', tokenValidator, require('./routes/trip.route'));
app.use('/api/query', tokenValidator, require('./routes/query.route'));
app.use('/api/response', tokenValidator, require('./routes/response.route'));
app.use('/api/booking', tokenValidator, require('./routes/booking.route'));
app.use('/api/user', tokenValidator, require('./routes/user.route'));
app.use('/blog', tokenValidator, require('./routes/blog.route'));
app.use('/api/guidline', tokenValidator, require('./routes/guidline.route'));
app.use('/api/subscription', tokenValidator, require('./routes/subscription.route'));
app.use('/api/master', tokenValidator, require('./routes/masterData.route'));
app.use('/api/media', tokenValidator, require('./routes/media.route'));
app.use('/api/authentication', tokenValidator, require('./routes/authentication.route'));

Master_model.find({}, function (err, result) {
  if (result.length == 0) {
    var futureDate = moment().add(15, 'days');
    var toDate = futureDate.toDate();
    Master_table = new Master_model({ 'createdon': toDate });
    Master_table.save((error, savedResult) => {
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at port : ${PORT}`);
})

module.exports.handler = serverless(app);


