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

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});



router.post('/upload', async (req, res) => {
    const image = req.files?.image;
    if (!image) return res.status(400).send('Upload Error');
    const fileName = Date.now() + image.name;
    try {
        const fileBuffer = await sharp(image.data).toBuffer();

        const uploadParams = {
            Bucket: bucketName,
            Body: fileBuffer,
            Key: fileName,
            ContentType: image.mimetype
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        res.send({ status: "success", path: fileName });
    } catch (error) {
        console.error("Error uploading to S3:", error);
        res.status(500).send('Error uploading to S3');
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
