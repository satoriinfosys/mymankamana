const express = require('express')
const router = express.Router()
const {NewQueryController,QueryDeleteController,GetAllQueryController,GetAllQueryByUserController} = require('../controllers/query.controller')

router.get('/get-all',GetAllQueryController)
router.get('/getByUser/:user',GetAllQueryByUserController)
router.post('/',NewQueryController)
router.delete('/delete/:id',QueryDeleteController)

module.exports = router