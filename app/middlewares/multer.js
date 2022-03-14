const multer = require('multer');

//set storage
let storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../app/public/uploads')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})

module.exports = store = multer({ storage: storage })