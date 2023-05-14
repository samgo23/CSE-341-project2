const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection'); // mongodb connection
const passport = require('passport');
require('./config/passport');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');

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
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], origin: '*' }))
  .use('/', require('./routes'))
  .use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"], // Allow content from the same origin
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts and eval()
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles
        imgSrc: ["'self'", "data:"], // Allow images from the same origin and data URIs
        connectSrc: ["'self'"], // Allow connections only to the same origin
        fontSrc: ["'self'"], // Allow fonts from the same origin
        objectSrc: ["'none'"], // Disallow plugins like Flash and Silverlight
        upgradeInsecureRequests: [], // Redirect HTTP requests to HTTPS
      },
    })
  );

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
