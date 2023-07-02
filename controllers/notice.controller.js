
const { NewnoticeModel, noticeDeleteModel, GetAllnoticeModel, toggleNotice } = require('../models/notice.model')

const NewnoticeController = async (req, res) => {
    let result = await NewnoticeModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const noticeDeleteController = async (req, res) => {
    let result = await noticeDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllnoticeController = async (req, res) => {
    let result = await GetAllnoticeModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const ToggleNoticeController = async (req, res) => {
    let result = await toggleNotice(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}


module.exports = { NewnoticeController, noticeDeleteController, GetAllnoticeController, ToggleNoticeController }