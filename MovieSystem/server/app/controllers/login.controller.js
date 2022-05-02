const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const Login = require("../models/login.model.js");
const jwt = require('jsonwebtoken');


router.post('/Login', async(req,res) => {
  const LogUser = new Login({
    token: "",
    username: req.body.username,
    password: req.body.password,
 });
  try{
    const {username, password} = req.body;
    const user = await User.findOne({ username })

    const passwordCorrect = user === null ? false : user.password === password;
    if(!user || !passwordCorrect){
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, "secret");
    LogUser.token = token;
    const newUser = await LogUser.save()
    res.status(201).json(newUser);
  }catch(error){
     res.status(500).json({message: error.message});
  }
})

router.get('/Login', async(req,res) => {
  try{
    const loggedUsers = await Login.find();
    res.send({data: loggedUsers});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


router.put('/Login', async (req,res) => {
  const email = req.body.email;
  const filter = {email: req.body.email};
  try{
   const loggedUser = await Login.findOne({email: email});
   await Login.updateOne(filter, {token: ''});
   await loggedUser.save();
   res.status(204).json(loggedUser);
  }catch(error){
    res.status(500).json({message: error.message + email});
  }
})

module.exports = router;
