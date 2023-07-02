
const {  UserDeleteModel, GetAllUserModel, GetUserByIdModel,NewUserModel } = require('../models/user.model')

const UserDeleteController = async (req, res) => {
    let result = await UserDeleteModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetAllUserController = async (req, res) => {
    let result = await GetAllUserModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const GetUserByIdController = async (req, res) => {
    let result = await GetUserByIdModel(req)
    if (result.error == null) {
        res.status(result.status).send({ api_status: 'Success', data: result.data })
    }
    else {
        res.status(result.status).send({ api_status: 'Error', error: result.err })
    }
}

const NewUserController = async (req,res)=>{
    let result = await NewUserModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data,message:result.message})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}


module.exports = {  UserDeleteController, GetAllUserController, GetUserByIdController,NewUserController }