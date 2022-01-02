const express = require('express');
const router = express.Router();

const {
   upload
} = require('../controllers/fileupload');

// inventory routes
router.post('/fileupload', upload);


module.exports = router;
