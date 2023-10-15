const mongoose = require("mongoose");
const dbCred = process.env.MonngoDBuri;  // Ensure the correct environment variable name

mongoose.set("strictQuery", false);
mongoose.connect(dbCred, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", function (error) {
    console.error("Connection error:", error);
});
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = db;
// const mongoose = require("mongoose");

// // Get the MongoDB URI from environment variables
// const dbCred = process.env.MonngoDBuri;

// // Check if the MongoDB URI is defined
// if (!dbCred) {
//     throw new Error('MongoDB URI is not set in environment variables.');
// }

// // Set mongoose option
// mongoose.set("strictQuery", false);

// // Connect to MongoDB
// mongoose.connect(dbCred, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .catch(error => {
//     console.error('Failed to connect to MongoDB:', error);
//     process.exit(1);  // Exit the application if there's an error
// });

// // Set up event listeners for the mongoose connection
// const db = mongoose.connection;

// db.on("error", function (error) {
//     console.error("Connection error:", error);
// });

// db.once("open", function () {
//     console.log("Connected successfully");
// });

// // Export the mongoose connection
// module.exports = db;
