var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

const { User_model } = require('./user.model')

const SignUpModel = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            req.body.password = hash;
            user_table = new User_model(req.body)
            user_table.save(function (err, data) {
                if (err) resolve(err);
                else {
                    resolve({ success: true, message: "User created successfully.Please proceed to login." })
                }
            });
        });
    })
}

const SignInModel = (req) => {
    return new Promise((resolve, reject) => {
        data = { email: req.body.email }
        User_model.find(data, function (err, data) {
            if (err) resolve(err)
            else {
                resolve(data)
            }
        })
    })
}

const SendOtpModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.findOne({ email: req.body.email }, function (err, data) {
            if (err) {
                resolve(err)
            }
            else {
                if (data == null) {
                    resolve({ error: true })
                }
                else {
                    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.zoho.com', // replace with the smtp server of Joho mail
                        port: 465, // replace with the smtp port provided by Joho mail, could be 465, 587, or others
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'info@mymanakamanatravels.com', // your Joho Mail account
                            pass: 'Uzw2mQUcHQf8', // your Joho Mail password
                        },
                    });

                    User_model.findOneAndUpdate({ email: req.body.email }, { $set: { temporaryOtp: otp } }, { new: true })

                    if (req.body.type == 'forgot-password') {
                        var mailOptions = {
                            from: 'info@mymanakamanatravels.com',
                            to: req.body.email,
                            subject: 'Greetings from  Mai Manakamana Tours and travel (P) Ltd ',
                            html:
                                `<div class="container"
                                    style="max-width: 90%; margin: auto; padding-top: 20px">
                                    <h2>Greetings from Mai Manakamana Tours and travel (P) Ltd.</h2>
                                    <h4>Don't worry we got your back.</h4>
                                    <p style="margin-bottom: 30px;">Here is your otp to change your password.</p>
                                    <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                            </div>`
                        };
                    }

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            resolve({ error: false, message: otp })
                        }
                    });

                }
            }
        })
    })
}

const verifyOtp = (req) => {
    return new Promise((resolve, reject) => {
        User_model.findOne({ email: req.body.email }, function (err, data) {
            if (err) {
                resolve(err)
            }
            else {
                if (data == null) {
                    resolve({ error: true })
                }
                else {
                    if (data.temporaryOtp == req.body.otp) {
                        resolve({ error: false })
                    }
                    else {
                        resolve({ error: false })
                    }
                }
            }
        })
    })
}

const ForgotPasswordModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.findOne({ email: req.body.email }, function (err, data) {
            if (err) {
                resolve(err)
            }
            else {
                if (data == null) {
                    resolve({ error: true })
                }
                else {
                    let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.zoho.com', // replace with the smtp server of Joho mail
                        port: 465, // replace with the smtp port provided by Joho mail, could be 465, 587, or others
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: 'info@mymanakamanatravels.com', // your Joho Mail account
                            pass: 'Uzw2mQUcHQf8', // your Joho Mail password
                        },
                    });

                    console.log('trasporter initiated');

                    var mailOptions = {
                        from: 'info@mymanakamanatravels.com',
                        to: req.body.email,
                        subject: 'Greetings from  Mai Manakamana Tours and travel (P) Ltd ',
                        html:
                            `<div class="container"
                                style="max-width: 90%; margin: auto; padding-top: 20px">
                                <h2>Greetings from Mai Manakamana Tours and travel (P) Ltd.</h2>
                                <h4>Don't worry we got your back.</h4>
                                <p style="margin-bottom: 30px;">Here is your otp to change your password.</p>
                                <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
                        </div>`
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log('error in sending mail');
                            console.log(error);
                            resolve({ error: true, message: error })
                        } else {
                            resolve({ error: false, message: `Email sent to ${req.body.email}` })
                        }
                    });

                }
            }
        })
    })
}

const ChangePasswordModel = (req) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(req.password, 10, function (err, hash) {
            req.password = hash;
            User_model.updateOne({ email: req.email }, { $set: { password: req.password } }, { new: true }, function (err, data) {
                if (err) resolve(err)
                else resolve(data)
            })
        })
    })
}

module.exports = { SignUpModel, SignInModel, ForgotPasswordModel, ChangePasswordModel, SendOtpModel, verifyOtp }
