const express = require('express')
const router = express.Router()
const {NewBookingController,BookingDeleteController,GetAllBookingController,GetAllBookingByUserController} = require('../controllers/booking.controller')

router.get('/get-all',GetAllBookingController)
router.get('/getByUser/:user',GetAllBookingByUserController)
router.post('/',NewBookingController)
router.delete('/delete/:id',BookingDeleteController)

module.exports = router