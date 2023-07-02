
const { User_model } = require('../models/user.model')

const checkDulplicateUsername = (req, res, next) => {
    User_model.find({ email: req.body.email }, function (err, data) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (data.length > 0) {
            res.status(400).send({ message: "User Already Exists.Please login to your account." });
            return;
        }
        next();
    })
}

// checkDuplicateItemName = (req, res, next) => {

//     Item_module.find({ ename: req.body.ename }, function (err, data) {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }
//         if (data.length > 0) {
//             res.status(400).send({ message: "Itemname not available.Please seletc another name." });
//             return;
//         }
//         next();
//     })
// }

module.exports = { checkDulplicateUsername }