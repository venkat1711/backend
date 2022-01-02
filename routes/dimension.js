const express = require('express');
const router = express.Router();

const {
    create,
    dimensionById,
    read,
    update,
    remove,
    list,
} = require('../controllers/dimension');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// dimension routes
router.get('/dimension/:dimensionId', read);
router.post('/dimension/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/dimension/:dimensionId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/dimension/:dimensionId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/dimensions', list);

router.param('dimensionId', dimensionById);
router.param('userId', userById);

module.exports = router;
