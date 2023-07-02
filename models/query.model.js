const mongoose = require('mongoose');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inviernonepal79@gmail.com',
        pass: 'ikezjyjknmojxzun'
    }
});


const Query_schema = new mongoose.Schema({
    packageId: String,
    packageName: String,
    userId: String,
    name: String,
    email: String,
    contactnumber: String,
    totalTraveller: String,
    expectedPrice: { type: Number, default: 0 },
    date: Date,
    address: { type: String, default: "Nepal" },
    message: String,
    status: { type: Number, default: 0 },
    visited: { type: Boolean, default: false },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Query_model = mongoose.models.Query || mongoose.model('Query', Query_schema);

const NewQueryModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Query_table = new Query_model(req.body)
            Query_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else {

                    resolve({ status: 200, error: null, data: data, message: "Successfully placed query.Please check your mail for response" })

                    var mailOptions = {
                        from: 'ElpasoAdmin',
                        to: 'inviernonepal79@gmail.com',
                        subject: 'New Enquiry Alert',
                        html:
                            `  <div>
                        <p>Package name:${req.body.packageName}</p>
                        <p>Client name:${req.body.name}</p>
                        <p>Client Email:${req.body.email}</p>
                        <p>Client Contact Number:${req.body.contactnumber}</p>
                        <p>Client Address:${req.body.address}</p>
                        <p>Total Traveller:${req.body.totalTraveller}</p>
                        <p>Expected Date:${req.body.date}</p>
                        <p>Expected price:${req.body.expectedPrice}</p>
                        <p>Custom message:${req.body.message}</p>
        
          </div>`
                    };

                    transporter.sendMail(mailOptions);


                }
            })
        }
        else {
            Query_model.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Query Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Query Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllQueryModel = (req) => {
    return new Promise((resolve, reject) => {
        Query_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllQueryByUserModel = (req) => {
    return new Promise((resolve, reject) => {
        Query_model.find({ "userId": req.params.user }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}



const QueryDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Query_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Query Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Query Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewQueryModel, QueryDeleteModel, GetAllQueryModel, GetAllQueryByUserModel, Query_model }