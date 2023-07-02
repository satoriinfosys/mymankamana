
const { NewTeamModel, TeamDeleteModel, GetAllTeamModel } = require('../models/team.model')

const NewTeamController = async (req, res) => {
    let result = await NewTeamModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const TeamDeleteController = async (req, res) => {
    let result = await TeamDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllTeamController = async (req, res) => {
    let result = await GetAllTeamModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}


module.exports = { NewTeamController, TeamDeleteController, GetAllTeamController }