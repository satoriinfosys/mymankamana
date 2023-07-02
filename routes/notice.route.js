const express = require('express')
const router = express.Router()
const {NewnoticeController,noticeDeleteController,GetAllnoticeController,ToggleNoticeController} = require('../controllers/notice.controller')

router.get('/get-all',GetAllnoticeController)
router.post('/',NewnoticeController)
router.patch('/',ToggleNoticeController)
router.delete('/delete/:id',noticeDeleteController)

module.exports = router