
const { NewGuidlineModel, GuidlineDeleteModel, GetAllGuidlineModel } = require('../models/guidline.model')

const NewGuidlineController = async (req,res)=>{
    let result = await NewGuidlineModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GuidlineDeleteController = async (req,res)=>{
    let result = await GuidlineDeleteModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GetAllGuidlineController = async (req,res)=>{
    let result = await GetAllGuidlineModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}


module.exports = {NewGuidlineController,GuidlineDeleteController,GetAllGuidlineController}