const express = require('express');
const router = express.Router();

const {
    create,
    bookformById,
    read,
    update,
    remove,
    list,
} = require('../controllers/bookform');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// bookform routes
router.get('/bookform/:bookformId', read);
router.post('/bookform/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/bookform/:bookformId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/bookform/:bookformId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/bookforms', list);

router.param('bookformId', bookformById);
router.param('userId', userById);

module.exports = router;
