
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'fotousers/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

module.exports = multer({storage: storage});
// const upload = multer({storage: storage});
