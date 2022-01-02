const express = require('express');
const router = express.Router();

const {
    create,
    authorById,
    read,
    update,
    remove,
    list,
} = require('../controllers/author');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// author routes
router.get('/author/:authorId', read);
router.post('/author/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
    '/author/:authorId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    '/author/:authorId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.get('/authors', list);

router.param('authorId', authorById);
router.param('userId', userById);

module.exports = router;
