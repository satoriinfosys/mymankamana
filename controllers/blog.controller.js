
const { NewBlogModel, BlogDeleteModel, GetAllBlogModel,GetAllBlogByUserModel,GetAllBlogByIdModel } = require('../models/blog.model')

const NewBlogController = async (req,res)=>{
    let result = await NewBlogModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data,message:result.message})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const BlogDeleteController = async (req,res)=>{
    let result = await BlogDeleteModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GetAllBlogController = async (req,res)=>{
    let result = await GetAllBlogModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}

const GetAllBlogByUserController = async(req,res)=>{
    let result = await GetAllBlogByUserModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}
const GetAllBlogByIdController = async(req,res)=>{
    let result = await GetAllBlogByIdModel(req)
    if(result.error == null ){
        res.status(result.status).send({api_status:'Success',data:result.data})
    }
    else{
        res.status(result.status).send({api_status:'Error',error:result.err})
    }
}


module.exports = {NewBlogController,BlogDeleteController,GetAllBlogController,GetAllBlogByUserController,GetAllBlogByIdController}