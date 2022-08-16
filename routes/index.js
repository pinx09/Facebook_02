var express = require('express');
var router = express.Router();
var userModel = require('./users');
var passport = require('passport');
var pl = require('passport-local');
passport.use(new pl(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}), function(req, res) {});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};

router.get('/profile', isLoggedIn, function(req, res, next) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(user) {
    res.render('profile', {user});
  });
});

router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

router.post('/registration', function(req, res, next) {
  var details = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email
  });

  userModel.register(details, req.body.password).then(function(registeredUser) {
    passport.authenticate("local")(req, res, function() {
      res.redirect('/profile');
    });
  });
});

module.exports = router;
