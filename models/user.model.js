const mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

const User_schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    contactNumber: { type: String, default: '' },
    aboutMe: { type: String, default: '' },
    image: { type: String, default: '' },
    profession: { type: String, default: '' },
    address: { type: String, default: '' },
    tripsCompleted: { type: Number, default: 0 },
    temporaryOtp:{ type: String, default: '' },
    emailOtp:{ type: String, default: '' },
    blogPosted: { type: Number, default: 0 },
    role: { type: String, default: 'user' },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const User_model = mongoose.models.User || mongoose.model('User', User_schema);

const NewUserModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            User_table = new User_model(req.body)
            User_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data, message: "User Added Successfully" })
            })
        }
        else {
            
            User_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'User Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: null, message: "User Updated Successfully" })
                    }
                }
            })
        }

    })
}

const GetAllUserModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const UserDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "User Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "User Successfully  Deleted" })
                }
            }
        })
    })
}

const GetUserByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.findOne({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

module.exports = { UserDeleteModel, GetAllUserModel, GetUserByIdModel,NewUserModel, User_model }


