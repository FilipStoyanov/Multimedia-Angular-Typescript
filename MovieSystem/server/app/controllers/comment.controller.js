const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model.js");
const ObjectId = require('mongoose').Types.ObjectId;

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.param('_id', function(req,res,next, _id){
  const modified = _id;
  req._id = modified;
  next();
})
router.get('/Comments', async (req, res) => {
  try{
    const comments = await Comment.find();
    res.send({data: comments});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Comments/:id', async (req, res) => {
  try{
    const comments = await Comment.find({id: req.params.id});
    res.send(comments);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post('/Comments', async (req,res) => {
  const comment = new Comment ({
    username: req.body.username,
    userId: req.body.userId,
    image: req.body.image,
    description: req.body.description,
    date: req.body.date,
    id: req.body.id,
  })
  try{
    const newComment = await comment.save()
    res.status(201).json(newComment);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})

router.delete('/Comments/:_id', async (req,res) => {
  try{
    await Comment.findByIdAndDelete(req.params._id);
    res.sendStatus(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


module.exports = router;
