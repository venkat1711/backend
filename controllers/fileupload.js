
var multer = require('multer'); 


exports.upload = (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, ('./myimg'));
        },
        filename: (req, file, callback) => {
            callback(null, 'homeimage.jpg');
        }
    });

    const upload = multer({storage: storage}).any('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                message: helper.getErrorMessage(err)
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host + '/myimg/' + file.filename
            }
        });
        res.status(200).json(results);
    });
}


