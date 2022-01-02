const express = require('express');
const router = express.Router();

const {
    create,
    acquisitionById,
    read,
    update,
    remove,
    list,
} = require('../controllers/acquisition');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// acquisition routes
router.get('/acquisition/:acquisitionId', read);
router.post('/acquisition/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/acquisition/:acquisitionId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/acquisition/:acquisitionId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/acquisitions', list);

router.param('acquisitionId', acquisitionById);
router.param('userId', userById);

module.exports = router;
