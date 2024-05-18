const { type } = require('@testing-library/user-event/dist/type');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'fotousers/')
    },
    filename: function(req, file, cb){
        cb(null, Date.new() + '-' + file.originalname);
    }
});

module.exports = multer({storage: storage});
