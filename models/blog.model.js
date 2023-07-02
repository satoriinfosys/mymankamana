const mongoose = require('mongoose');
const { User_model } = require('./user.model')

const Blog_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    isGuidline: { type: Boolean, default: false },
    trip: { type: String },
    author: {
        id: { type: String },
        name: { type: String, required: true },
        image: { type: String, required: true },
        profession: { type: String, required: true },
    },
    views: { type: Number, default: 0 },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Blog_model = mongoose.model('Blog', Blog_schema)

const NewBlogModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Blog_table = new Blog_model(req.body)
            Blog_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else {
                    resolve({ status: 200, error: null, data: data, message: "Blog Added Successfully" })
                    User_model.findOneAndUpdate({ _id: req.body.author.id }, { $inc: { 'blogPosted': 1 } }, { new: true }, function (err, data) {
                        if (err) console.log("ccc")
                        else console.log("ddd")
                    })
                }
            })
        }
        else {
            Blog_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Blog Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: null, message: "Blog Updated Successfully" })
                    }
                }
            })
        }

    })
}

const GetAllBlogModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const BlogDeleteModel = (req) => {
    return new Promise((resolve, reject) => {

        Blog_model.findOne({ _id: req.params.id }, function (err, data) {
            if (err) console.log("eee")
            else {
                User_model.findOneAndUpdate({ _id: data?.author?.id }, { $inc: { 'blogPosted': -1 } }, { new: true }, function (err, data) {
                    if (err) console.log("fff")
                    else console.log("ggg")
                })

                Blog_model.deleteOne({ _id: req.params.id }, function (err, data) {
                    if (err) { resolve({ status: 500, error: true, err: err }) }
                    else {
                        if (data.deletedCount == 0) {
                            resolve({ status: 400, error: true, err: "Blog Not Found" })
                        }
                        else {
                            resolve({ status: 200, error: null, data: "Blog Successfully  Deleted" })
                        }
                    }
                })
            }
        })
    })
}

const GetAllBlogByUserModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({ "author.id": req.params.user }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllBlogByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        Blog_model.find({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else {
                resolve({ status: 200, error: null, data: data })
                Blog_model.findOneAndUpdate({ _id: req.params.id }, { $inc: { 'views': 1 } }, { new: true }, function (err, data) {
                    if (err) console.log("hhh")
                    else console.log("iii")
                })
            }
        })
    })
}

module.exports = { NewBlogModel, BlogDeleteModel, GetAllBlogModel, GetAllBlogByUserModel, GetAllBlogByIdModel }