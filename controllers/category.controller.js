
const { NewCategoryModel, CategoryDeleteModel, GetAllCategoryModel } = require('../models/category.model')

const NewCategoryController = async (req,res)=>{
    let result = await NewCategoryModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const CategoryDeleteController = async (req,res)=>{
    let result = await CategoryDeleteModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GetAllCategoryController = async (req,res)=>{
    let result = await GetAllCategoryModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}


module.exports = {NewCategoryController,CategoryDeleteController,GetAllCategoryController}