const express = require('express');
const router = express.Router();
const path = require('path');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bucketName = 'parash-limo-final';
const region = 'us-east-1';
const accessKeyId = 'YOUR_ACCESS_KEY_ID';
const secretAccessKey = 'YOUR_SECRET_ACCESS_KEY';

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

router.post('/upload', upload.single('image'), async (req, res) => {
    console.log(req);

    const file = req.file;
    const fileBuffer = await sharp(file.buffer).toBuffer();
    const fileName = file.originalname;
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: file.mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        res.send({ fileName });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/file/:fileName', async function (req, res) {
    try {
        const fileName = req.params.fileName;
        const params = {
            Bucket: bucketName,
            Key: fileName,
        };

        const response = await s3Client.send(new GetObjectCommand(params));

        const imageBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            response.Body.on('data', (chunk) => chunks.push(chunk));
            response.Body.on('error', reject);
            response.Body.on('end', () => resolve(Buffer.concat(chunks)));
        });

        if (imageBuffer) {
            res.send(imageBuffer);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
