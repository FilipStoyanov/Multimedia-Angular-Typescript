const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model.js");

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.get('/Notification', async (req, res) => {
  try{
    const notifications = await Notification.find();
    res.send({data: notifications});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Notification/user/:id', async (req, res) => {
  try{
    const notifications = await Notification.find({receiver: req.params.id});
    res.send({data: notifications});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


router.post('/Notification', async (req,res) => {
  const notification = new Notification ({
    senderId: req.body.senderId,
    senderUsername: req.body.senderUsername,
    receiver: req.body.receiver,
    movieId: req.body.movieId,
    seen: false,
    type: req.body.type,
  })
  try{
    const newNotification = await notification.save()
    res.status(201).json(newNotification);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})

router.patch('/Notification/:id', async (req,res) => {
  try{
    const body = {
      senderId: req.body.senderId,
      senderUsername: req.body.senderUsername,
      receiver: req.body.receiver,
      movieId: req.body.movieId,
      seen: req.body.seen,
      type: req.body.type,
    };
  await Notification.findByIdAndUpdate(req.params.id, body);
  }catch(error){
   res.status(500).json({message: error.message});
  }
})
router.delete('/Notification/:id', async (req,res) => {
  try{
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});



module.exports = router;
