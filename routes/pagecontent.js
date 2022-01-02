const express = require('express');
const router = express.Router();

const {
    create,
    pagecontentById,
    read,
  
} = require('../controllers/pagecontent');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');


// inventory routes
router.get('/pagecontent/:id', read);
router.post('/pagecontent/create/:name', requireSignin, create);


router.param('id', pagecontentById);


module.exports = router;
