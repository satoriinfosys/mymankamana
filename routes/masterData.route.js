const express = require('express')
const router = express.Router()
const { NewMasterController, MasterDeleteController, GetAllMasterController } = require('../controllers/masterData.controller')

router.post('/', NewMasterController)
router.get('/:agencyCode', GetAllMasterController)
router.delete('/delete/:id', MasterDeleteController)

module.exports = router