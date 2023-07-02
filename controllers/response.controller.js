var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inviernonepal79@gmail.com',
        pass: 'ikezjyjknmojxzun'
    }
    
});

const { Booking_model } = require('../models/booking.model')
const { Query_model } = require("../models/query.model")


const BookingApproval = async (req, res) => {

    var mailOptions = {
        from: 'ElpasoAdmin',
        to: req.body.email,
        subject: 'Greetings from  Elpaso Adventure ',
        html:
            `  <div>
            <p style="text:xl">Greetings from elpaso adventure.</p>

            <p>Dear ${req.body.name.toUpperCase()},</p>

            <p>We are pleased to inform you that your booking for the <strong>${req.body.package}</strong> package has been confirmed. The total number of travelers for this booking is <strong>${req.body.totalTraveller}</strong>. The email address associated with this booking is <strong>${req.body.email}</strong>.</p>
        
            <p>The total price for the package is <strong>USD.${req.body.price}</strong>. Your booking has been scheduled for <strong>${req.body.date}</strong>. If you have any further queries or concerns regarding your booking, please do not hesitate to contact us.</p>
        
            <p>Thank you for choosing our service for your travel needs. We look forward to providing you with an unforgettable travel experience.</p>
        
            <p>Best regards,</p>
        
            <p>Elpaso Adventure</p>
            <p>+977-9847118318</p>
            <p>Thamel, Nepal</p>
          </div>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error)
        } else {
            Booking_model.findOneAndUpdate({ _id: req.body.id }, { $set: { 'status': 1 } }, { new: true }, function (err, data) {
                if (err) console.log("fff")
                else console.log("ggg")
            })
            res.status(200).json({ message: `Email sent to ${req.body.email}` })
        }
    });

}

const BookingRejection = async (req, res) => {

    var mailOptions = {
        from: 'ElpasoAdmin',
        to: req.body.email,
        subject: 'Greetings from  Elpaso Adventure ',
        html:
            `  <div>
            <p>Dear ${req.body.name.toUpperCase()},</p>
        
            <p>We regret to inform you that your booking for the <strong>${req.body.package}</strong> package could not be processed. Unfortunately, the package is fully booked for the date you have requested.</p>
        
            <p>We understand that this may cause inconvenience, and we apologize for any disappointment this may have caused. However, we have several other exciting travel packages available that may suit your needs. Please feel free to browse our website or contact us to explore alternative options.</p>
        
            <p>Thank you for your interest in our services. We hope to have the opportunity to serve you in the future.</p>
        
            <p>Best regards,</p>
        
            <p>Elpaso Adventure</p>
            <p>+977-9847118318</p>
            <p>Thamel, Nepal</p>
          </div>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).send(error)
        } else {
            Booking_model.findOneAndUpdate({ _id: req.body.id }, { $set: { 'status': 2 } }, { new: true }, function (err, data) {
                if (err) console.log("fff")
                else console.log("ggg")
            })
            res.status(200).send({ message: `Email sent to ${req.body.email}` })
        }
    });

}


const EnquiryResponse = async (req, res) => {
    console.log(req.body);
    var mailOptions = {
        from: 'ElpasoAdmin',
        to: req.body.email,
        subject: 'Greetings from  Elpaso Adventure ',
        html:
            `  <div>
            <p>Dear ${req.body.name.toUpperCase()},</p>
        
            <p>Thank you for your interest in our travel services. We are excited to hear from you regarding your enquiry about the <strong>${req.body.package}</strong> package.</p>
        
            <p>Based on your request,${req.body.enquiryMessage} </p>
        
            <p>We take pride in providing exceptional customer service, and we are always happy to answer any further questions or concerns you may have. Our team will be in touch shortly to discuss your enquiry and help you plan your next adventure.</p>
        
            <p>Thank you again for considering our services. We look forward to providing you with an unforgettable travel experience.</p>
        
            <p>Best regards,</p>
        
            <p>Elpaso Adventure</p>
            <p>+977-9847118318</p>
            <p>Thamel, Nepal</p>
          </div>`
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.status(400).send(error)
        } else {
            Query_model.findOneAndUpdate({ _id: req.body.id }, { $set: { 'status': 1 } }, { new: true }, function (err, data) {
                if (err) console.log("fff")
                else console.log("ggg")
            })
            res.status(200).send({ message: `Response sent to ${req.body.email}` })
        }
    });

}

const EnquiryDelete = async (req, res) => {
    Query_model.findOneAndDelete({ _id: req.params.id }, function (err, data) {
        if (err) res.status(400).send(err)
        else res.status(200).send({ message: "Enquiry removed successfully" })
    })
}



module.exports = { EnquiryResponse, BookingApproval, BookingRejection, EnquiryDelete }