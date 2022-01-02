const express = require('express');
const router = express.Router();

const {
  create,
  provenienzaById,
  read,
  update,
  remove,
  list,
} = require('../controllers/provenienza');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// provenienza routes
router.get('/provenienza/:provenienzaId', read);
router.post('/provenienza/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/provenienza/:provenienzaId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/provenienza/:provenienzaId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/provenienzas', list);

router.param('provenienzaId', provenienzaById);
router.param('userId', userById);

module.exports = router;
