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

// module.exports = db
const mongoose = require("mongoose");

// Use a consistent variable name
const dbCred = process.env.MONGODB_URI;

// Set Mongoose option
mongoose.set("strictQuery", false);

// Connect to MongoDB
mongoose.connect(dbCred, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected successfully to MongoDB"))
.catch(error => console.error("MongoDB connection error:", error));

const db = mongoose.connection;

// This might be redundant since we're handling connection errors with the promise above.
// However, if you want to keep it for future event-based error handling, you can.
db.on("error", error => {
    console.error("Connection error:", error);
});

module.exports = db;
