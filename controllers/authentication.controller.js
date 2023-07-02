
const { SignUpModel, SignInModel, ForgotPasswordModel, ChangePasswordModel,SendOtpModel,verifyOtp } = require('../models/authentication.model')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SignUpController = async (req, res) => {
    const result = await (SignUpModel(req))
    res.send(result)
}

const VerifyController = async (req, res) => {
    res.status(200).send("Token Verified")
}

const SignInController = async (req, res) => {
    const result = await (SignInModel(req))
    if (result.length == 1) {
        bcrypt.compare(req.body.password, result[0].password, function (err, bool) {
            if (bool == false) {
                res.status(400).send({ success: false, message: 'Passwords do not match' });
                return
            } else {
                let jwtSecretKey = process.env.jtw_secret_key;
                let data = {
                    time: Date(),
                    userId: req.body.email,
                }
                const token = jwt.sign(data, jwtSecretKey, {
                    algorithm: "HS256",
                    expiresIn: '24h'
                });
                res.status(200).send({ success: true, token: token, user: result[0].username,userMail: result[0].email, role: result[0].role, id: result[0]._id });
                return
            }
        })
    }
    else {
        res.status(400).send({ success: false, message: 'User does not exist.' })
    }
}

const SendOtpController = async (req, res) => {
    const result = await SendOtpModel(req)
    if (result?.error == true) {
        res.status(400).send({ message: `User with mail ${req.body.email} not found.`})
    }
    else {
        res.status(200).send({ message: `OPT sent to ${req.body.email}.`})
    }
}

const VerifyOtpController = async (req, res) => {
    const result = await verifyOtp(req)
    if (result?.error == true) {
        res.status(400).send({ message: `Invalid OTP`})
    }
    else {
        res.status(200).send({ message: `OTP Verified`})
    }
}

const ForgotPasswordController = async (req, res) => {
    const result = await ForgotPasswordModel(req)
    if (result?.error == true) {
        res.status(400).send({ message: `No user found with mail ${req.body.email}`})
    }
    else {
        res.status(200).send({ message: `Please proceed to ${req.body.email} to change password`})
    }
}

const ChangePasswordController = async (req, res) => {
    const result = await ChangePasswordModel(req.body)
    if (result.modifiedCount == 1) {
        res.send({ message: "Password chnaged successfully" })
    }
    else if (result.modifiedCount == 0) {
        res.send({ message: `User ${req.body.username} not found` })
    }
    else {
        res.status(400).send(result)
    }
}


module.exports = { SignInController, SignUpController, VerifyController, ForgotPasswordController, ChangePasswordController,SendOtpController,VerifyOtpController }