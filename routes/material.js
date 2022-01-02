const express = require('express');
const router = express.Router();

const {
  create,
  materialById,
  read,
  update,
  remove,
  list,
} = require('../controllers/material');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// material routes
router.get('/material/:materialId', read);
router.post('/material/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/material/:materialId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/material/:materialId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get('/materials', list);

router.param('materialId', materialById);
router.param('userId', userById);

module.exports = router;
