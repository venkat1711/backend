const express = require('express');
const router = express.Router();

const {
  create,
  allpostsById,
  read,
  update,
  remove,
  list,
  photo,
  searchFilters,
  inventoryNumber,
  searchposts,
} = require('../controllers/allposts');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// allposts routes
router.get('/allposts/:allpostsId', read);
router.post('/allposts/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/allposts/:allpostsId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/allposts/:allpostsId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/allposts/photo/:allpostsId', photo);

router.post('/allposts', list);
router.post('/search/filters', searchFilters);
router.get('/inventoryNumber',inventoryNumber);

router.param('allpostsId', allpostsById);
router.param('userId', userById);

router.post('/search/posts', searchposts);

module.exports = router;