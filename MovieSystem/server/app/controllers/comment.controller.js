const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model.js");

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
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


module.exports = router;
