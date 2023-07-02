const mongoose = require('mongoose');

const notice_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    createdby: String,
    updatedby: String,
    status: { type: Boolean, default: true },
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const notice_model = mongoose.model('Notice', notice_schema)

const NewnoticeModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            notice_table = new notice_model(req.body)
            notice_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            notice_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'notice Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'notice Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllnoticeModel = (req) => {
    return new Promise((resolve, reject) => {
        notice_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const noticeDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        notice_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "notice Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "notice Successfully  Deleted" })
                }
            }
        })
    })
}

const toggleNotice = (req) => {
    return new Promise((resolve, reject) => {
        notice_model.findOneAndUpdate({ _id: req.body.id }, { $set: { status: req.body.status } }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data == null) {
                    resolve({ status: 400, error: true, err: "Notice Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Status changed" })
                }
            }
        })
    })
}

module.exports = { NewnoticeModel, noticeDeleteModel, GetAllnoticeModel, toggleNotice }