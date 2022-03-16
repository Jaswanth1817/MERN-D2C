const express = require('express');
const auth = require('../config/auth');
const router = express.Router();
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async(req, res, next) => {

  let checkUser = await User.findOne({email: req.body.email});
  try {
    if(checkUser) {
    res.json({success: false, msg: 'Email already exists'});
    }
    else {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();
      let token = await auth.issueToken(user);
      res.json({success: true, msg: 'User registered', token: token, user: user});
    }
  } catch (error) {
    res.json({success: false, msg: 'Failed to register user', error: error.message});
  }
  
});

// Login
router.post('/login', async(req, res, next) => {

  let user = await User.findOne({email: req.body.email});
  try {
    if(!user) {
      res.json({success: false, msg: 'User not found'});
    }
    else {
      let validPassword = await bcrypt.compare(req.body.password, user.password);
      if(!validPassword) {
        res.json({success: false, msg: 'Wrong password'});
      }
      else {
        let token = await auth.issueToken(user);
        res.json({success: true, msg: 'User logged in', token: token, user: user});
      }
    }
  } catch (error) {
    res.json({success: false, msg: 'Failed to login user', error: error.message});
  }
  
});

module.exports = router;