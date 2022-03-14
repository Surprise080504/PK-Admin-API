const path = require('path');
const fs = require("fs");
const stream = require("stream");
const { encrypt, decrypt } = require('../helpers/crypto');
const cryptoConfig = require("../config/crypto.config");
const db = require("../models");
const Message = db.messages;

const CryptoAlgorithm = "aes-256-cbc";
function getEncryptedFilePath(filePath) {
    return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + '_' + Date.now() + path.extname(filePath))
}

function getDecryptedFilePath(filePath) {
    return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + path.extname(filePath))
}

function saveEncryptedFile(buffer, filePath, key, iv) {
    const encrypted = encrypt(CryptoAlgorithm, buffer, key, iv);
    filePath = getEncryptedFilePath(filePath);
    if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath))
    }
    fs.writeFileSync(filePath, encrypted);
    return filePath;
}

function getEncryptedFile(filePath, key, iv) {
    filePath = getDecryptedFilePath(filePath);
    const encrypted = fs.readFileSync(filePath);
    const buffer = decrypt(CryptoAlgorithm, encrypted, key, iv);
    return buffer;
}

exports.uploadImage = async (req, res) => {
    const files = res.req.files;
    if (!files) {
        const error = new Error('Please choose files')
        res.status(500).json(error);
    }
    if (req.body?.type == 'message') {
        let imgArr = [];
        for (let i = 0; i < res.req.files.length; i++) {
            let generatedFileName = saveEncryptedFile(res.req.files[i].buffer, path.join("./uploads", res.req.files[i].originalname), cryptoConfig.CKEY, cryptoConfig.CIV);
            let size;
            if (res.req.files[i].size > 1024 * 1024) {
                size = Math.round((res.req.files[i].size / 1024 / 1024) * 100) / 100 + 'MB';
            } else {
                size = Math.round((res.req.files[i].size / 1024) * 100) / 100 + 'KB';
            }
            let obj = {
                originalName: res.req.files[i].originalname,
                size: size,
                generatedFileName: generatedFileName.split('\\')[1],
                mimeType: res.req.files[i].mimetype.split('/')[1]
            }
            imgArr.push(obj);
        }

        req.body.type = "image";
        req.body.content = JSON.stringify(imgArr);

        const newMessage = new Message(req.body);
        try {
            await newMessage.save();
            res.status(200).json({ msg: newMessage });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        for (let i = 0; i < res.req.files.length; i++) {
            let generatedFileName = saveEncryptedFile(res.req.files[i].buffer, path.join("./uploads", res.req.files[i].originalname), cryptoConfig.CKEY, cryptoConfig.CIV);
        }
        res.status(200).json(files);
    }
}

exports.getImage = async (req, res) => {
    console.log("Getting file:", req.params.imageName);
    const buffer = getEncryptedFile(path.join(__dirname, "../../uploads", req.params.imageName), cryptoConfig.CKEY, cryptoConfig.CIV);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);
    res.writeHead(200, {
        "Content-disposition": "attachment; imageName=" + req.params.imageName,
        "Content-Type": "application/octet-stream",
        "Content-Length": buffer.length
    });
    res.end(buffer);
}
