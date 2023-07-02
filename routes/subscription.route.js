const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})
const subscriptionModel = mongoose.model('Subscription', subscriptionSchema)

router.post('/', (req, res) => {
    subscription_table = new subscriptionModel(req.body)
    subscription_table.save((err, data) => {
        if (err) res.status(400).send({error: true, err: err })
        else res.status(200).send({ message:"Subsription successfull" })
    })
})

router.get('/get-all', (req, res) => {
    subscriptionModel.find({}, function (err, data) {
        if (err) res.status(400).send({error: true, err: err })
        else res.status(200).send({ data: data })
    })
})

router.delete('/delete/:id', (req, res) => {
  subscriptionModel.deleteOne({_id:req.params.id},function(err,data){
    if (err) res.status(400).send({error: true, err: err })
    else res.status(200).send({ message:"Subscription removed successfully"})
  })
})

module.exports = router