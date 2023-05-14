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
  async (req, res) => {
    try {
      // User authentication successful, redirect to the desired page
      res.redirect('/swagger/api-docs');

      // Access the authenticated user information from req.user
      const { githubId, username, displayName, email, avatar } = req.user;

      // Check if the user already exists in your database
      let user = await User.findOne({ githubId });

      if (!user) {
        // User does not exist, create a new user record
        user = await User.create({
          githubId,
          username,
          displayName,
          email,
          avatar
        });
      }

      // You can perform additional actions with the user if needed

    } catch (error) {
      // Handle any errors that occur during user persistence
      console.error('Error persisting user:', error);
    }
  }
);


module.exports = router;
