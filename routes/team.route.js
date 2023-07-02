const express = require('express')
const router = express.Router()
const {NewTeamController,TeamDeleteController,GetAllTeamController} = require('../controllers/team.controller')

router.get('/get-all',GetAllTeamController)
router.post('/',NewTeamController)
router.delete('/delete/:id',TeamDeleteController)

module.exports = router