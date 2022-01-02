const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {
    create,
    read,
    registerpostById,
    registerpostListByUserId,
    remove,
} = require('../controllers/registerpost');

// registerpost routes
router.get('/registerpost/:registerpostId', read); // single registerpost by id
router.post('/registerpost/add/:userId', requireSignin, isAuth, create);
router.delete('/registerpost/:registerpostId/:userId', requireSignin, isAuth, remove);
//registerpostlist by UserId
router.get('/registerpost/list/:userId', requireSignin, isAuth, registerpostListByUserId);

router.param('userId', userById);
router.param('registerpostId', registerpostById);

module.exports = router;
