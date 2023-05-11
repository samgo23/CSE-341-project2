var express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection'); // mongodb connection
const passport = require('passport');
require('./config/passport');
const session = require('express-session');

const port = process.env.PORT || 8080;
const app = express();

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// require('./config/passport')(passport);

app
  .use(passport.initialize())
  .use(passport.session());

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});



app.post('/login', (req, res) => {
  const authorizationCode = req.body.code;

  client.requestToken(authorizationCode, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
});
