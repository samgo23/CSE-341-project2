const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc Logout user
// @route   /auth/logout
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/api-docs');
});

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/swagger/api-docs' }),
  function (req, res) {
    res.redirect('/swagger/api-docs');
  }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/swagger/api-docs' }),
  function (req, res) {
    res.redirect('/swagger/api-docs');
  }
);

module.exports = router;
