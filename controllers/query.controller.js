
const { NewQueryModel, QueryDeleteModel, GetAllQueryModel,GetAllQueryByUserModel } = require('../models/query.model')

const NewQueryController = async (req, res) => {
    let result = await NewQueryModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', message:result.message })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const QueryDeleteController = async (req, res) => {
    let result = await QueryDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllQueryController = async (req, res) => {
    let result = await GetAllQueryModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllQueryByUserController = async (req, res) => {
    let result = await GetAllQueryByUserModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}


module.exports = { NewQueryController, QueryDeleteController, GetAllQueryController,GetAllQueryByUserController }