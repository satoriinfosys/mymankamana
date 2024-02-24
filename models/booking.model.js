const mongoose = require('mongoose');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // replace with the smtp server of Joho mail
    port: 465, // replace with the smtp port provided by Joho mail, could be 465, 587, or others
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'info@mymanakamanatravels.com', // your Joho Mail account
        pass: 'Uzw2mQUcHQf8', // your Joho Mail password
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
                        from: 'info@mymanakamanatravels.com',
                        to: 'info@mymanakamanatravels.com',
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

                    var mailOptions2 = {
                        from: 'info@mymanakamanatravels.com',
                        to: req.body.email,
                        subject: 'Greetings from  Mai Manakamana Tours and travel (P) Ltd ',
                        html:
                            `  <div>
                            <p style="text:xl">Greetings from Mai Manakamana Tours and travel (P) Ltd.</p>
                
                            <p>Dear ${req.body.name.toUpperCase()},</p>
                
                            <p>We are pleased to inform you that your booking for the <strong>${req.body.package}</strong> package has been placed. The total number of travelers for this booking is <strong>${req.body.totalTraveller}</strong>. The email address associated with this booking is <strong>${req.body.email}</strong>.</p>
                        
                            <p>The total price for the package is <strong>USD.${req.body.price}</strong>. Your booking has been scheduled for <strong>${req.body.date}</strong>. If you have any further queries or concerns regarding your booking, please do not hesitate to contact us.</p>
                        
                            <p>Thank you for choosing our service for your travel needs. We look forward to providing you with an unforgettable travel experience.</p>
                        
                            <p>Best regards,</p>
                        
                            <p>Mai Manakamana Tours and travel (P) Ltd</p>
                            <p>+977-9865288330,01-4351232</p>
                            <p>Thamel, Nepal</p>
                          </div>`
                    };

                    transporter.sendMail(mailOptions);
                    transporter.sendMail(mailOptions2);

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