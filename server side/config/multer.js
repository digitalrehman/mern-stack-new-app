import multer from 'multer'
let storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
let file_filter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(new Error('Only .jpeg and .png format allowed!'), false)
    }
}
let upload = multer({ storage: storage, fileFilter: file_filter })
export default upload;