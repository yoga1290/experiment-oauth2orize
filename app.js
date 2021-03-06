/**
 * Module dependencies.
 */
var express = require('express')
  , passport = require('passport')
  , site = require('./site')
  , oauth2 = require('./oauth2')
  , user = require('./user')
  , util = require('util')
  
  
// Express configuration
  
var app = express.createServer();
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
// do not use layout
app.set('view options', { layout: false });
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
/*
app.use(function(req, res, next) {
  console.log('-- session --');
  console.dir(req.session);
  //console.log(util.inspect(req.session, true, 3));
  console.log('-------------');
  next()
});
*/
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Passport configuration


app.get('/', site.index);
app.get('/login', site.loginForm);
app.post('/login', site.login);
app.get('/logout', site.logout);
app.get('/account', site.account);

app.get('/dialog/authorize', oauth2.authorization);
app.post('/dialog/authorize/decision', oauth2.decision);
app.get('/oauth/token', oauth2.token);

app.get('/api/userinfo', user.info);

app.listen(3000);
