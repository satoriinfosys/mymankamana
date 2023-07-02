const express = require('express')
const router = express.Router()
const {NewEventController,EventDeleteController,GetAllEventController,ToggleEventController} = require('../controllers/event.controller')

router.get('/get-all',GetAllEventController)
router.post('/',NewEventController)
router.patch('/',ToggleEventController)
router.delete('/delete/:id',EventDeleteController)

module.exports = router