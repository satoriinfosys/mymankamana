const express = require('express')
const router = express.Router()
var path = require('path');


router.post('/upload', (req, res) => {
    const { image } = req.files;
    if (!image) return res.status(400).send('Upload Error');
    fileName = Date.now() + image.name
    const path = __dirname + "/../uploads/" + fileName;
    image.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: "success", path: fileName });
    });
});

router.get('/file/:fileName', function (req, res) {
    const filePath = path.resolve(__dirname + '/../uploads/' + req.params.fileName)
    res.sendFile(filePath);
})


module.exports = router