const express = require('express');
const router = express.Router();

const {
    create,
    fragmentById,
    read,
    update,
    remove,
    list,
} = require('../controllers/fragment');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// fragment routes
router.get('/fragment/:fragmentId', read);
router.post('/fragment/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/fragment/:fragmentId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/fragment/:fragmentId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/fragments', list);

router.param('fragmentId', fragmentById);
router.param('userId', userById);

module.exports = router;
