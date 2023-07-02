const mongoose = require('mongoose');

const category_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    slogan: { type: String, required: true },
    createdby: String,
    updatedby: String,
    status: {type:Boolean,default:true},
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const category_model = mongoose.model('Category', category_schema)

const NewCategoryModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            category_table = new category_model(req.body)
            category_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            category_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Category Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Category Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllCategoryModel = (req) => {
    return new Promise((resolve, reject) => {
        category_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const CategoryDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        category_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Category Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Category Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewCategoryModel, CategoryDeleteModel, GetAllCategoryModel }