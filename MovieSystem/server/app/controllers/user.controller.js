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
router.param('id', function(req,res,next, id){
  const modified = id;
  req.id = modified;
  next();
})

const userExists = async (email) => {
 const user = await User.findOne({email: email.toLowerCase().trim()});
    if(user){
        return true;
    }
    return false;
}

const userExistsByUser = async (username) => {
  const user = await User.findOne({username: username});
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
     firstname: req.body.firstname,
     lastname: req.body.lastname,
     email: req.body.email,
     image: req.body.image,
     birthdate: req.body.birthdate,
     username: req.body.username,
     password: req.body.password,
     role: 'user',
     id: ''
  })
  try{
    if(await userExists(req.body.email)){
      res.send(null);
      // res.status(409).json({
      //   error: 'Email already exists',
      // })
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


router.get('/Users/:_id', async (req,res) => {
  try{
    const user = await User.findOne({_id: req.params._id});
    res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.put('/Users/:username', async (req,res) => {
  try{
    const updateUser = await User.findOne({username:req.params.username});
    let newFriends = [...updateUser.friends];
    if(updateUser.friends){
      if(updateUser.friends.indexOf(req.body.friend) === -1){
        newFriends.push(req.body.friend);
      }else{
        let index = updateUser.friends.indexOf(req.body.friends);
        updateUser.friends.splice(index,1);
        newFriends = [...updateUser.friends];

      }
    }else{
      newFriends = [...updateUser.friends];
    }
    await User.updateOne({username: req.params.username}, {friends: [...newFriends]});
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

router.patch('/Users/:username', async (req,res) => {
  try{
    const body = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
    };
  await User.updateOne({username: req.params.username}, body);
  }catch(error){
   res.status(500).json({message: error.message});
  }
})
module.exports = router;
