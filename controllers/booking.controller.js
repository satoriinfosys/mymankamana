
const { NewBookingModel, BookingDeleteModel, GetAllBookingModel,GetAllBookingByUserModel } = require('../models/booking.model')

const NewBookingController = async (req, res) => {
    let result = await NewBookingModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success',  message:"Booking Success. Please check your profile or email for confirmation." })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const BookingDeleteController = async (req, res) => {
    let result = await BookingDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllBookingController = async (req, res) => {
    let result = await GetAllBookingModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllBookingByUserController = async (req, res) => {
    let result = await GetAllBookingByUserModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}


module.exports = { NewBookingController, BookingDeleteController, GetAllBookingController,GetAllBookingByUserController }