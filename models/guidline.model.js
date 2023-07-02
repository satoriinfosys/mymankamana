const mongoose = require('mongoose');

const Guidline_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Guidline_model = mongoose.model('Guidline', Guidline_schema)

const NewGuidlineModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Guidline_table = new Guidline_model(req.body)
            Guidline_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            Guidline_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Guidline Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Guidline Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllGuidlineModel = (req) => {
    return new Promise((resolve, reject) => {
        Guidline_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const GuidlineDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Guidline_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Guidline Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Guidline Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewGuidlineModel, GuidlineDeleteModel, GetAllGuidlineModel }