const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  forgetPassword,
  resetPassword,
} = require('../controllers/auth');
const {
  userSignupValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.put('/forget/Password', forgetPasswordValidator, forgetPassword);
router.put('/reset/Password', resetPasswordValidator, resetPassword);

module.exports = router;