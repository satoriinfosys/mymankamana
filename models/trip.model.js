const mongoose = require('mongoose');

const trip_schema = new mongoose.Schema({
    category: { type: String },
    name: { type: String },
    bannerImage: { type: String },
    tripImage: { type: String },
    mapImage: { type: String },
    video: { type: String },
    imageGallery: [],
    price: { type: String },
    isSpecialOffer: { type: Boolean, default: false },
    isSpanish: { type: Boolean, default: false },
    offerPrice: String,
    pax2Price: String,
    pax5price: String,
    pax10price: String,
    pax15price: String,
    pax16price: String,
    summary: {
        duration: String,
        destination: String,
        startPoint: String,
        endPoint: String,
        groupSize: String,
        maxaltitude: String,
        bestSeason: String,
        difficulty: String,
        meals: String,
        accomodation: String,
        activities: String,
    },
    tripHighlight: { type: [] },
    description: { type: String },
    itinerary: {
        description: { type: String },
      
        details: [
            {
                head: { type: String , default:null },
                headDetails: { type: String , default:null },
                mode: { type: String , default:null },
                routeItinerary: { type: String , default:null },
                elevation: { type: String , default:null },
                duration: { type: String , default:null },
                overnight: { type: String , default:null },
                included: { type: String , default:null },
                activity: { type: String , default:null },
                activityDuration: { type: String , default:null },
                accomodation: { type: String , default:null },
            }
        ]
    },
    inclusion: { type: [] },
    optionalInclusion: { type: [] },
    exclusion: { type: [] },
    aboutTrip: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    faq: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    customerReview: [
        {
            userid: String,
            user: String,
            rating: String,
            comment: String,
            postedOn: { type: Date, default: Date.now() },
        }
    ],
    totalViews: { type: Number, default: 500 },
    rating: { type: Number, default: 4.5 },
    status: { type: Boolean, default: true },
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const trip_model = mongoose.model('Trip', trip_schema)

const NewTripModel = (req) => {
    // const reg = new RegExp("i",req.body.name)
    return new Promise(async (resolve, reject) => {

        if (req.body?._id == '') {
            const rndInt = Math.floor(Math.random() * 500) + 1
            delete req.body._id
            req.body['totalViews'] = rndInt
            trip_table = new trip_model(req.body)
            trip_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data, message: 'Trip added succesfully' })
            })
        }
        else {
            trip_model.findByIdAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, message: 'Trip Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, message: 'Trip successfully updated' })
                    }
                }
            })
        }

        // trip_model.find({$or:[{name:reg,code:reg}]})

    })
}

const PostCommentModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.updateOne({ _id: req.body.tripId }, { $push: { "customerReview": req.body } }, function (err, data) {
            if (err) {
                resolve({ error: err, status: 400 })
            }
            else {
                resolve({ error: null, status: 200 })
            }
        })
    })
}

const GetAllTripByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.findById({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else {
                resolve({ status: 200, error: null, data: data })
                trip_model.findOneAndUpdate({ _id: req.params.id }, { $inc: { 'totalViews': 1 } }, { new: true }, function (err, data) {
                    if (err) console.log("bbb")
                    else console.log("aaa")
                })
            }
        })
    })
}

const GetAllTripModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const TripDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Trip Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Trip Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewTripModel, TripDeleteModel, GetAllTripModel, GetAllTripByIdModel, PostCommentModel }