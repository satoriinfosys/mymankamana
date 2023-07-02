const mongoose = require('mongoose');

const Team_schema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    createdby: String,
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    profession: { type: String, default: '' },
    updatedby: String,
    status: { type: Boolean, default: true },
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Team_model = mongoose.model('Team', Team_schema)

const NewTeamModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Team_table = new Team_model(req.body)
            Team_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            Team_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Team Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Team Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllTeamModel = (req) => {
    return new Promise((resolve, reject) => {
        Team_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const TeamDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Team_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Team Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Team Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewTeamModel, TeamDeleteModel, GetAllTeamModel }