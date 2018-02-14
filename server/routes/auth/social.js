const express = require('express');
const router = express.Router();
const Recipe = require('../../db/models/Recipe');
const User = require("../../db/models/User");
const passport = require('passport');
// const FacebookTokenStrategy = require('passport-facebook-token');

// passport.use(new FacebookTokenStrategy({
//     clientID: process.env.FB_CLIENT_ID,
//     clientSecret: process.env.FB_CLIENT_SECRET,
//     callbackURL: "https://recipe-app-adace1.c9users.io/auth/facebook/callback"
//   }, function (accessToken, refreshToken, profile, done) {
//       console.log(accessToken, refreshToken, profile, done);
//   }
// ));

// router.get('/facebook', passport.authenticate('facebook-token'));

router.get('/facebook/callback', (req, res, next) => {
});


module.exports = router;