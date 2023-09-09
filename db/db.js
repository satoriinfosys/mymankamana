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

const mongoose = require("mongoose");

// Using consistent variable naming
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI not defined. Ensure you've set up your environment variables correctly.");
    process.exit(1);
}

// Debug line to verify if URI is being loaded correctly
console.log('MongoDB URI (Debugging):', MONGODB_URI);

// Set Mongoose option
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully to MongoDB"))
.catch(error => {
    console.error("MongoDB connection error:", error);
    // If you want to stop the entire process when there's a DB connection error
    process.exit(1);
});

const db = mongoose.connection;

// Event-based error handling. This can coexist with the promise-based error handling.
// It can be useful for future or other types of errors after initial connection.
db.on("error", error => {
    console.error("Connection error:", error);
});

module.exports = db;
