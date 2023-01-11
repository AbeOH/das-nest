const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const aws = require("aws-sdk");
const fs = require("fs");

require("dotenv").config();
// const aws = require("aws-sdk");
const { AWS_KEY, AWS_SECRET, AWS_BUCKET } = process.env;

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        /// second argumnet in callback says where file should be save
        callback(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fieldSize: 2097152,
    },
});

const s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
});

function fileUpload(req, res, next) {
    console.log("file: ", req.file);
    if (!req.file) {
        console.log("[imageboard:s3] file not there");
        res.statusCode = 400;
        res.send();
    } else {
        const { mimetype, filename, path, size } = req.file;
        const fileContent = fs.readFileSync(path);

        s3.putObject({
            Bucket: AWS_BUCKET,
            ACL: "public-read",
            Key: filename,
            Body: fileContent,
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then(() => {
                res.locals.fileUrl = `https://s3.amazonaws.com/${AWS_BUCKET}/${filename}`;
                next();
            })
            .catch((err) => {
                console.log("[imageboard:s3] error uploading to s3", err);
                res.sendStatus(500);
            });
    }
}

module.exports = { uploader, fileUpload };
