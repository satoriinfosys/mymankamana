const jwt = require('jsonwebtoken')
const secretKey = process.env.jtw_secret_key

const FetchDetails = (req) => {
    let token = req.headers["x-access-token"];
    return new Promise(async(resolve, reject) => {
        jwt.verify(token, secretKey, (err, decode) => {
            if(err) resolve({error:err});
            else{
                resolve(decode)
            }
        })
    })
}

module.exports = FetchDetails