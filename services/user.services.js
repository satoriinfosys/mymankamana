const NewUserModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?.id == '') {
            delete req.body.id
            req.body.password = await bcrypt.hash("P@ssw0rd12", 10)
            User_table = new User_model(req.body)
            User_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            User_model.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'User Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'User Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllUserModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const UserDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "User Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "User Successfully  Deleted" })
                }
            }
        })
    })
}

const GetUserByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        User_model.find({ _id: req.params.id }, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}