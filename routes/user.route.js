const express = require('express')
const router = express.Router()
const {  UserDeleteController, GetAllUserController, GetUserByIdController,NewUserController } = require('../controllers/user.controller')

router.get('/get-all', GetAllUserController)
router.post('/', NewUserController)
router.get('/getById/:id', GetUserByIdController)
router.delete('/delete/:id', UserDeleteController)

module.exports = router