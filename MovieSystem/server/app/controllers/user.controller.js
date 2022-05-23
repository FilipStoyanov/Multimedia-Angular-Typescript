const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

router.param('email', function(req, res, next, email) {
    const modified = email;
    req.email = modified;
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
     role: req.body.role || 'user',
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


router.get('/Users/:id', async (req,res) => {
  try{
      let user = await User.findById(req.params.id);
      res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Users/:email/:description', async (req,res) => {
  try{
      let user = await User.findOne({email: req.params.email});
      res.send(user);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.put('/Users/:id', async (req,res) => {
  try{
    const updateUser = await User.findOne({_id: req.params.id});
    let newFriends = [...updateUser.friends];
    let friendIds = [];
    for (const friend of updateUser.friends){
        friendIds.push(friend.id);
    }
    console.log(friendIds);
    if(updateUser.friends){
      if(friendIds.indexOf(req.body.friends.id) === -1){
        newFriends.push(req.body.friends);
      }else{
        let index = friendIds.indexOf(req.body.friends.id);
        updateUser.friends.splice(index,1);
        newFriends = [...updateUser.friends];
      }
    }else{
      newFriends = [...updateUser.friends];
    }
    await User.updateOne({_id: req.params.id}, {friends: [...newFriends]});
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

router.patch('/Users/:id', async (req,res) => {
  try{
    const body = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      birthdate: req.body.birthdate,
    };
  await User.updateOne({username: req.params.id}, body);
  }catch(error){
   res.status(500).json({message: error.message});
  }
})

router.delete('/Users/:id', async (req,res) => {
  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
