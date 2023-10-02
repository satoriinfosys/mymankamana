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

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// import dotenv from 'dotenv'
// dotenv.config()
// import crypto from 'crypto'
// const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

// import multer from 'multer'
// import sharp from 'sharp'


// export const getImage = async (
//     req: Request<{ fileName: string }, any, any>,
//     res: Response
//   ) => {
//     try {
//       const { fileName } = req.params;
//       const bucketName = process.env.AWS_BUCKET_NAME
//       const region = process.env.AWS_BUCKET_REGION
//       const accessKeyId: any = process.env.AWS_ACCESS_KEY
//       const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY


//       const s3Client = new S3Client({
//         region,
//         credentials: {
//           accessKeyId,
//           secretAccessKey
//         }
//       })

//       const params = {
//         Bucket: bucketName,
//         Key: fileName
//       };

//       // let r = 

//       const response: any = await s3Client.send(new GetObjectCommand(params));

//       const imageBuffer = await new Promise((resolve, reject) => {
//         const chunks: any = [];
//         response.Body.on('data', (chunk: any) => chunks.push(chunk));
//         response.Body.on('error', reject);
//         response.Body.on('end', () => resolve(Buffer.concat(chunks)));
//       });


//       if (imageBuffer) {
//         // console.log('ddd');

//         // res.writeHead(200, { 'Content-Type': 'image/*' });
//         // res.end(imageBuffer, 'binary');
//         res.send(imageBuffer);
//       } else {
//         res.status(404).send('Image not found');
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   };

//     const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId: any = process.env.AWS_ACCESS_KEY
// const secretAccessKey: any = process.env.AWS_SECRET_ACCESS_KEY

// const s3Client = new S3Client({
//     region,
//     credentials: {
//         accessKeyId,
//         secretAccessKey
//     }
// })


// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// router.post('/image', upload.single('image'), async (req, res) => {
//     console.log(req);

//     const file: any = req.file
//     // const caption = req.body.caption
//     const fileBuffer = await sharp(file.buffer)
//         // .resize({ fit: "contain" })
//         .toBuffer()
//     // Configure the upload details to send to S3
//     const fileName = file.originalname
//     const uploadParams = {
//         Bucket: bucketName,
//         Body: fileBuffer,
//         Key: fileName,
//         ContentType: file.mimetype
//     }
//     // Send the upload to S3
//     await s3Client.send(new PutObjectCommand(uploadParams));

//     res.send({ fileName })
// })



module.exports = router