
const dotenv = require('dotenv').config();
const express = require('express');
const moment = require('moment');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = express();
const connectToDatabase = require('./db/db.js');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const { Master_model } = require('./models/materData.model.js');
const { tokenValidator } = require('./middlewares/verify-token.middelware');



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}); 

// Express app configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
   origin: ['*','https://www.mymanakamanatravels.com']
}));
app.use(fileUpload());

// Define routes
app.use('/api/category', tokenValidator, require('./routes/category.route'));
app.use('/api/team', tokenValidator, require('./routes/team.route'));
app.use('/api/notice', tokenValidator, require('./routes/notice.route'));
app.use('/api/event', tokenValidator, require('./routes/event.route'));
app.use('/api/trip', tokenValidator, require('./routes/trip.route'));
app.use('/api/query', tokenValidator, require('./routes/query.route'));
app.use('/api/response', tokenValidator, require('./routes/response.route'));
app.use('/api/booking', tokenValidator, require('./routes/booking.route'));
app.use('/api/user', tokenValidator, require('./routes/user.route'));
app.use('/api/blog', tokenValidator, require('./routes/blog.route'));
app.use('/api/guidline', tokenValidator, require('./routes/guidline.route'));
app.use('/api/subscription', tokenValidator, require('./routes/subscription.route'));
app.use('/api/master', tokenValidator, require('./routes/masterData.route'));
app.use('/api/media', tokenValidator, require('./routes/media.route'));
app.use('/api/authentication', tokenValidator, require('./routes/authentication.route'));


connectToDatabase()
  .then(() => {
    console.log('Connected to database');
    // Add your server setup and start code here
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

Master_model.find({}, function (err, result) {
    if (result.length == 0) {
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

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT}`);
});

// Export the Express app wrapped in a serverless function


// 

// const serverless = require('serverless-http');
// const dotenv = require('dotenv').config();
// const express = require('express');
// const moment = require('moment');
// const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');
// const app = express();
// const conn = require('./db/db.js');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');
// const { Master_model } = require('./models/materData.model.js');
// const { tokenValidator } = require('./middlewares/verify-token.middelware.js');

// const corsOptions = {
//   origin: 'https://www.mymanakamanatravels.com',
// };
// // Enable CORS for all routes or specific routes
// app.use(cors(corsOptions));


// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors({ origin: '*' }));
// app.use(fileUpload());

// app.use('/api/category', tokenValidator, require('./routes/category.route'));
// app.use('/api/team', tokenValidator, require('./routes/team.route'));
// app.use('/api/notice', tokenValidator, require('./routes/notice.route'));
// app.use('/api/event', tokenValidator, require('./routes/event.route'));
// app.use('/api/trip', tokenValidator, require('./routes/trip.route'));
// app.use('/api/query', tokenValidator, require('./routes/query.route'));
// app.use('/api/response', tokenValidator, require('./routes/response.route'));
// app.use('/api/booking', tokenValidator, require('./routes/booking.route'));
// app.use('/api/user', tokenValidator, require('./routes/user.route'));
// app.use('/api/blog', tokenValidator, require('./routes/blog.route'));
// app.use('/api/guidline', tokenValidator, require('./routes/guidline.route'));
// app.use('/api/subscription', tokenValidator, require('./routes/subscription.route'));
// app.use('/api/master', tokenValidator, require('./routes/masterData.route'));
// app.use('/api/media', tokenValidator, require('./routes/media.route'));
// app.use('/api/authentication', tokenValidator, require('./routes/authentication.route'));

// connectToDatabase()
//   .then(() => {
//     console.log('Connected to database');
//     // Add your server setup and start code here
//   })
//   .catch((error) => {
//     console.error('Failed to connect to database:', error);
//     process.exit(1);
//   });
// // Export your Express app as a serverless function
// module.exports.handler = serverless(app);