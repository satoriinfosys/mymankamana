// Import required modules
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import express from 'express';
import moment from 'moment';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Create an instance of the AWS S3 client
const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

// Define routes
const routes = [
  '/api/category',
  '/api/team',
  '/api/notice',
  '/api/event',
  '/api/trip',
  '/api/query',
  '/api/response',
  '/api/booking',
  '/api/user',
  '/api/blog',
  '/api/guideline',
  '/api/subscription',
  '/api/master',
  '/api/media',
  '/api/authentication'
];

routes.forEach(route => {
  app.use(route, tokenValidator, require(`./routes${route}.route`));
});

// Connect to database
connectToDatabase()
  .then(() => {
    console.log('Connected to database');
    // Add any server setup code here
  })
  .catch(error => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

// Check and save data in Master_model if necessary
Master_model.find({}, (err, result) => {
  if (result.length === 0) {
    const futureDate = moment().add(15, 'days').toDate();
    const masterTable = new Master_model({ 'createdon': futureDate });
    masterTable.save((error, savedResult) => {
      if (error) {
        console.error('Error occurred while saving data:', error);
      }
    });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
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