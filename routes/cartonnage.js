const express = require('express');
const router = express.Router();

const {
    create,
    cartonnageById,
    read,
    update,
    remove,
    list,
} = require('../controllers/cartonnage');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// cartonnage routes
router.get('/cartonnage/:cartonnageId', read);
router.post('/cartonnage/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/cartonnage/:cartonnageId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/cartonnage/:cartonnageId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/cartonnages', list);

router.param('cartonnageId', cartonnageById);
router.param('userId', userById);

module.exports = router;
