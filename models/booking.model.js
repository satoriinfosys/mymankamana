const mongoose = require('mongoose');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // replace with the smtp server of Joho mail
    port: 465, // replace with the smtp port provided by Joho mail, could be 465, 587, or others
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'info@mymanakamatravels.com', // your Joho Mail account
        pass: 'Manakamana1@', // your Joho Mail password
    },
});

const Booking_schema = new mongoose.Schema({
    packageId: String,
    packageName: String,
    userId: String,
    name: String,
    email: String,
    contactnumber: String,
    totalTraveller: String,
    date: Date,
    address: { type: String, default: "Nepal" },
    price: String,
    message: String,
    status: { type: Number, default: 0 },
    visited: { type: Boolean, default: false },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Booking_model = mongoose.models.Booking || mongoose.model('Booking', Booking_schema);

const NewBookingModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Booking_table = new Booking_model(req.body)
            Booking_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else {

                    resolve({ status: 200, error: null, data: data })

                    var mailOptions = {
                        from: 'MyManakamanaAdmin',
                        to: 'info@mymanakamatravels.com',
                        subject: 'New Booking Alert',
                        html:
                            `  <div>
                        <p>Package name:${req.body.packageName}</p>
                        <p>Client name:${req.body.name}</p>
                        <p>Client Email:${req.body.email}</p>
                        <p>Client Contact Number:${req.body.contactnumber}</p>
                        <p>Client Address:${req.body.address}</p>
                        <p>Total Traveller:${req.body.totalTraveller}</p>
                        <p>Expected Date:${req.body.date}</p>
                        <p>Expected price:${req.body.price}</p>
                        <p>Custom message:${req.body.message}</p>
        
          </div>`
                    };

                    transporter.sendMail(mailOptions);

                }
            })
        }
        else {
            Booking_model.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Booking Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Booking Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllBookingModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllBookingByUserModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.find({ "userId": req.params.user }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const BookingDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Booking_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Booking Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Booking Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewBookingModel, BookingDeleteModel, GetAllBookingModel, GetAllBookingByUserModel, Booking_model }