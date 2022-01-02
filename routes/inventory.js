const express = require('express');
const router = express.Router();

const {
    create,
    inventoryById,
    read,
    update,
    remove,
    list,
} = require('../controllers/inventory');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// inventory routes
router.get('/inventory/:inventoryId', read);
router.post('/inventory/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/inventory/:inventoryId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/inventory/:inventoryId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/inventorys', list);

router.param('inventoryId', inventoryById);
router.param('userId', userById);

module.exports = router;
