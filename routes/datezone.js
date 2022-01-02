const express = require('express');
const router = express.Router();

const {
  create,
  datezoneById,
  read,
  update,
  remove,
  list,
} = require('../controllers/datezone');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// datezone routes
router.get('/datezone/:datezoneId', read);
router.post('/datezone/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/datezone/:datezoneId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/datezone/:datezoneId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/datezones', list);

router.param('datezoneId', datezoneById);
router.param('userId', userById);

module.exports = router;
