const mongoose = require('mongoose');

const Event_schema = new mongoose.Schema({
    name: { type: String, required: true },
    imageGallery: [],
    description: { type: String, required: true },
    createdby: String,
    updatedby: String,
    status: { type: Boolean, default: true },
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Event_model = mongoose.model('Event', Event_schema)

const NewEventModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Event_table = new Event_model(req.body)
            Event_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            Event_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Event Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Event Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllEventModel = (req) => {
    return new Promise((resolve, reject) => {
        Event_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const EventDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Event_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Event Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Event Successfully  Deleted" })
                }
            }
        })
    })
}

const toggleEvent = (req) => {
    return new Promise((resolve, reject) => {
        Event_model.findOneAndUpdate({ _id: req.body.id }, { $set: { status: req.body.status } }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data == null) {
                    resolve({ status: 400, error: true, err: "Event Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Status changed" })
                }
            }
        })
    })
}

module.exports = { NewEventModel, EventDeleteModel, GetAllEventModel, toggleEvent }