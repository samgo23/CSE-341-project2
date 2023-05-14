const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/employee', require('./employee'));
router.use('/auth', require('./auth'));
router.use('/ticket', require('./ticket'));


router.get(
  '/login',
  passport.authenticate('github', (req, res) => {})
);

// @desc AUTH with Google
// @route   GET /auth/google

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google auth callback
// @route   GET /auth/google/callback

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;