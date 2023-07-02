const mongoose = require("mongoose");
const dbCred = process.env.MonngoDBuri

mongoose.set("strictQuery", false);
mongoose.connect(dbCred,
    {
        useNewUrlParser: true
    }
);
const db = mongoose.connection;

db.on("error", function () {
    console.error.bind(console, "connection error: ")
});
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports = db