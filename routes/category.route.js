const express = require('express')
const router = express.Router()
const {NewCategoryController,CategoryDeleteController,GetAllCategoryController} = require('../controllers/category.controller')

router.get('/get-all',GetAllCategoryController)
router.post('/',NewCategoryController)
router.delete('/delete/:id',CategoryDeleteController)

module.exports = router