
const { NewMasterModel, MasterDeleteModel, GetAllMasterModel }= require('../models/materData.model')

const NewMasterController = async (req,res)=>{
    let result = await NewMasterModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data,message:result.message})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const MasterDeleteController = async (req,res)=>{
    let result = await MasterDeleteModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GetAllMasterController = async (req,res)=>{
    let result = await GetAllMasterModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}


module.exports = {NewMasterController,MasterDeleteController,GetAllMasterController}