const { EnquiryResponse, BookingApproval, BookingRejection,EnquiryDelete } = require('../controllers/response.controller')
const express = require('express')
const router = express.Router()

router.post('/booking/approval',BookingApproval)
router.post('/booking/rejection',BookingRejection)
router.post('/enquiry',EnquiryResponse)
router.delete('/enquiry/delete/:id',EnquiryDelete)

module.exports = router