const multer = require('multer')
const { appConfig } = require('../../config')

const UploadPathAction = {
    upload_courses_video: 'upload_courses_video',
    upload_course_cover: 'upload_course_cover',
    upload_profile_picture: 'upload_profile_picture',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let finalDest = "./files"

        if (req.body.action === UploadPathAction.upload_courses_video) {
            finalDest += "/videos"
        }
        if (req.body.action === UploadPathAction.upload_profile_picture) {
            finalDest += "/users"
        }
        if (req.body.action === UploadPathAction.upload_course_cover) {
            finalDest += "/covers"
        }
        
        cb(null, finalDest)
    },
    filename: function (req, file, cb) {

        if (req.body.action === UploadPathAction.upload_profile_picture) {
          
            cb(null, req.user._id)
        }
        const filename_ = req.user._id + '_' + Date.now().toString().toLowerCase() +'.'+file.originalname.split('.')[file.originalname.split('.').length-1]
        cb(null, filename_)
    }
})


function fileFilter(req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    // cb(null, false)

    // To accept the file pass `true`, like so:
    cb(null, true)

    // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'))

}


const upload = multer({ storage: storage, limits: { fileSize: appConfig.video_limit } })

module.exports = { upload, UploadPathAction }