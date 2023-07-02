const express = require('express')
const { SignInController, SignUpController,VerifyController,ForgotPasswordController,SendOtpController,VerifyOtpController,ChangePasswordController } = require('../controllers/authentication.controller')
const router = express.Router()
const { verifyToken } = require("../middlewares/verify-token.middelware")
const { checkDulplicateUsername } = require("../middlewares/duplicate-trip.middleware")

router.post('/sign-in',SignInController)
router.post('/sign-up',checkDulplicateUsername,SignUpController)
router.post('/forgotPassword',ForgotPasswordController)
router.post('/change-password',ChangePasswordController)
router.get('/verify',verifyToken,VerifyController)
router.post('/request-otp',SendOtpController)
router.post('/verify-otp',VerifyOtpController)

module.exports = router