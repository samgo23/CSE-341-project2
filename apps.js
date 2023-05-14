var express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection'); // mongodb connection
const passport = require('passport');
require('./config/passport');
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
  .use(cors({ orgin: '*' }))
  .use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
});

app.get('/', (req, res) => {
  if (req.session.user) {
    console.log('Logged in as', req.session.user);
  }

  res.send(req.session.user ? `Logged in ${req.session.user}` : 'Logged Out');
});


