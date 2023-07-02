const mongoose = require('mongoose');

const Master_schema = new mongoose.Schema({
    agencyCode:String,
    name: { type: String},
    logo: { type: String},
    footerBio: { type: String},
    bannerBio: { type: String},
    bannerQuote: { type: String},
    aboutUsImage: { type: String},
    bannerImage: { type: String},
    aboutUsDescription: { type: String},
    services: [],
    facebookLink: { type: String},
    instagramLink: { type: String},
    youtubeLink: { type: String},
    address: { type: String},
    email: { type: String},
    contact: { type: String},
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const Master_model = mongoose.model('Master', Master_schema)

const NewMasterModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            delete req.body._id
            Master_table = new Master_model(req.body)
            Master_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data,message:"Master Data Successfully Added" })
            })
        }
        else {
            Master_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Master Data Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null,data:null, message: 'Master Data Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllMasterModel = (req) => {
    return new Promise((resolve, reject) => {
        Master_model.find({agencyCode:req.params.agencyCode}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const MasterDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        Master_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Master Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Master Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewMasterModel, MasterDeleteModel, GetAllMasterModel }