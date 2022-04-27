const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");


const userExists = async (email) => {
 const user = await  User.findOne({email: email.toLowerCase().trim()});
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
    const s = userExists(req.body.email);
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


module.exports = router;
