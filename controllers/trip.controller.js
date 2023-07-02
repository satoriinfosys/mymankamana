
const { NewTripModel, TripDeleteModel, GetAllTripModel, GetAllTripByIdModel,PostCommentModel } = require('../models/trip.model')

const NewTripController = async (req, res) => {
    let result = await NewTripModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data,message:result.message })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const TripDeleteController = async (req, res) => {
    let result = await TripDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllTripByIdController = async (req, res) => {
    let result = await GetAllTripByIdModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const PostCommentController = async (req, res) => {
    let result = await PostCommentModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success',message:"Success"})
    }
    else {
        res.status(result.status).send({ api_status: 'Error', message:"Error" })
    }
}


const GetAllTripController = async (req, res) => {
    let result = await GetAllTripModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}


module.exports = { NewTripController, TripDeleteController, GetAllTripController, GetAllTripByIdController,PostCommentController }