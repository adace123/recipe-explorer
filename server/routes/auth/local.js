const express = require('express');
const router = express.Router();
const Recipe = require('../../db/models/Recipe');
const User = require("../../db/models/User");
const authHelpers = require('../../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { Op } = require('sequelize');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'keyboard cat'
};

passport.use(new JwtStrategy(jwtOptions, (payload, next) => {
    console.log(payload);
    // Recipe.find({where: {userid: payload.user.userid, recipeid: payload.user.recipeid}})
    // .then(recipe => {
    //     if(recipe)
    //     next(null, recipe);
        
    //     else next(null, false);
    // });
}));


// use auth middleware to protect routes
router.get("/users/:id", (req, res, next) => {
    return User.find({where: {userid: req.params.id}, attributes: ['userid', 'email', 'username']})
    .then(user => res.status(200).json(user));
});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    if(req.body.token) {
       return res.status(500).json({message: "Already logged in"});
    }
    
    return User.find({where: {email: req.body.email}})
    .then(user => {
      if(!user || !bcrypt.compareSync(req.body.password, user.password))
      return res.status(401).json({error: "Invalid email or password"});
      const token = jwt.sign({user}, jwtOptions.secretOrKey);
      const userData = {
          email: user.email,
          username: user.username,
          userid: user.userid
      };
      res.status(200).json({user: userData, token, isAdmin: user.isAdmin()});

    });
});

router.post('/logout', (req, res, next) => {
    console.log(req.body);
    if(!req.body.token) {
        return res.status(400).json({message: "Must be signed in to logout."});
    }
    return res.status(200).json({message: "Successfully logged out"});
});

router.post('/register', (req, res, next) => {
   return User.find({where: {[Op.or] : [{email: req.body.email}, {username: req.body.username}]}})
   .then(user => {
       if(user) {
           return res.status(400).json({message: "Account already exists"});
       }
       
       const newUser = {
            userid: uuid(),
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        };
        const token = jwt.sign({userid: req.body.userid}, jwtOptions.secretOrKey);
        return User.create(newUser).then(user => res.status(200).json({user, token, isAdmin: user.isAdmin()}));
   });
   
});

module.exports = router;