const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

router.param('email', function(req, res, next, email) {
    const modified = email;
    req.email = modified;
    next();
});
router.param('username', function(req, res, next, username) {
  const modified = username;

  req.username = modified;
  next();
});
router.param('id', function(req, res, next, id) {
  const modified = id;

  req.id = modified;
  next();
});

const userExists = async (email) => {
 const user = await User.findOne({email: email.toLowerCase().trim()});
    if(user){
        return true;
    }
    return false;
}

router.get('/Users', async (req,res) => {
  try{
    const users = await User.find();
    res.send({data: users});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


router.post('/Users', async (req,res) => {
  const user = new User ({
     firstname: req.body.firstName,
     lastname: req.body.lastName,
     email: req.body.email,
     birthdate: req.body.birthday,
     username: req.body.username,
     password: req.body.password,
     role: 'user'
  })
  try{
    if(await userExists(req.body.email)){
      res.status(409).json({
        error: 'Email already exists',
      })
    }else{
      const newUser = await user.save()
      res.status(201).json(newUser);
    }
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


router.get('/Users/:username', async (req,res) => {
  try{
    const user = await User.findOne({username: req.params.username});
    res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


router.get('/Users/:id', async (req,res) => {
  try{
    const user = await User.findOne({username: req.params.id});
    res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})
module.exports = router;
