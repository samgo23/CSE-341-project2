const express = require('express');
const passport = require('passport');
const router = express.Router();




// @desc Logout user
// @route   /auth/logout

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/api-docs');
  });
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api-docs' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api-docs');
  });

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api-docs');
  });

module.exports = { router };
