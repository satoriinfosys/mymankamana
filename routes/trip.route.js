
const express = require('express')
const router = express.Router()
const { NewTripController, TripDeleteController, GetAllTripController, GetAllTripByIdController,PostCommentController } = require('../controllers/trip.controller')

router.get('/get-all', GetAllTripController)
router.get('/get-trip/:id', GetAllTripByIdController)
router.post('/', NewTripController)
router.post('/post-comment',PostCommentController )
router.delete('/delete/:id', TripDeleteController)

module.exports = router