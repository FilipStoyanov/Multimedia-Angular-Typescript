const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");


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
    const newUser = await user.save()
    res.status(201).json(newUser);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


module.exports = router;
