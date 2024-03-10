// const mongoose = require("mongoose");
// const dbCred = process.env.MonngoDBuri

// mongoose.set("strictQuery", false);
// mongoose.connect(dbCred,
//     {
//         useNewUrlParser: true
//     }
// );
// const db = mongoose.connection;

// db.on("error", function () {
//     console.error.bind(console, "connection error: ")
// });
// db.once("open", function () {
//     console.log("Connected successfully");
// });




// db.js
const mongoose = require("mongoose");

// Get the MongoDB URI from environment variables
const dbCred = process.env.MonngoDBuri;

// Check if the MongoDB URI is defined
if (!dbCred) {
    throw new Error('MongoDB URI is not set in environment variables.');
}

// Set mongoose option
mongoose.set("strictQuery", false);

// Export the function to connect to the database
module.exports = () => {
    return mongoose.connect(dbCred, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
