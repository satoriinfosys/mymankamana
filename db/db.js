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
const dbCred = process.env.MonngoDBuri;
  // Using the same variable name as you provided

if (!dbCred) {
    throw new Error('MongoDB URI is not set in environment variables.');
}

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
