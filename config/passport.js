const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const GitHubStrategy = require('passport-github2');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ 
    googleId: profile.id,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    image: profile.photos[0].value 
  }, function (err, user) {
    return cb(err, user);
  });
}
));

//passport.use(
//  new GoogleStrategy(
//    {
//      // options for the google strategy
//      callbackURL: 
//      clientID: 
//      clientSecret: 
//    },
//    async (accessToken, refreshToken, profile, done) => {
//      // passport callback function
//      const newUser = {
//        
//      };
//
//      try {
//        let user = await User.findOne({ googleId: profile.id });
//
//        if (user) {
//          done(null, user);
//        } else {
//          user = await User.create(newUser);
//          done(null, user);
//        }
//      } catch (err) {
//        console.error(err);
//        done(err, null);
//      }
//    }
//  )
//);

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ 
    githubId: profile.id,
    username: profile.username,
    displayName: profile.displayName,
    email: profile.emails[0].value,
    avatar: profile.photos[0].value 
  }, function (err, user) {
    return done(err, user);
  });
}
));

//passport.use(
//  new GithubStrategy(
//    {
//      clientID: 
//      clientSecret: 
//      callbackURL: 
//    },
//    async (accessToken, refreshToken, profile, done) => {
//      try {
//        let user = await User.findOne({ githubId: profile.id });
//
//        if (user) {
//          done(null, user);
//        } else {
//          const newUser = {
//            githubId: profile.id,
//            
//          };
//
//          user = await User.create(newUser);
//          done(null, user);
//        }
//      } catch (err) {
//        console.error(err);
//        done(err, null);
//      }
//    }
//  )
//);
//
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
