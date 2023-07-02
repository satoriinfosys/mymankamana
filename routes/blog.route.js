const express = require('express')
const router = express.Router()
const {NewBlogController,BlogDeleteController,GetAllBlogController,GetAllBlogByUserController,GetAllBlogByIdController} = require('../controllers/blog.controller')

router.get('/get-all',GetAllBlogController)
router.get('/getByUser/:user',GetAllBlogByUserController)
router.get('/getById/:id',GetAllBlogByIdController)
router.post('/',NewBlogController)
router.delete('/delete/:id',BlogDeleteController)

module.exports = router