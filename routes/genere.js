const express = require('express');
const router = express.Router();

const {
  create,
  genereById,
  read,
  update,
  remove,
  list,
} = require('../controllers/genere');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// genere routes
router.get('/genere/:genereId', read);
router.post('/genere/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/genere/:genereId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/genere/:genereId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/generes', list);

router.param('genereId', genereById);
router.param('userId', userById);

module.exports = router;
