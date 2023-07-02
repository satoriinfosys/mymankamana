const express = require('express')
const router = express.Router()
const { NewGuidlineController, GuidlineDeleteController, GetAllGuidlineController } = require('../controllers/guidline.controller')

router.get('/get-all', GetAllGuidlineController)
router.post('/', NewGuidlineController)
router.delete('/delete/:id', GuidlineDeleteController)

module.exports = router