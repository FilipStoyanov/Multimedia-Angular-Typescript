const express = require("express");
const router = express.Router();
const Ranking = require("../models/ranking.model.js");

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.get('/Ranking', async (req, res) => {
  try{
    const ranking = await Ranking.find();
    res.send({data: ranking});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Ranking/user/:id', async (req, res) => {
  try{
    const ranking = await Ranking.find({receiver: req.params.id});
    res.send({data: ranking});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})


router.put('/Ranking', async (req,res) => {
  try{
    const filter = {collectionId: req.body.collectionId};
    const ranking = await Ranking.findOne({collectionId: req.body.collectionId});
    if(ranking){
      let newMovies = [];
      newMovies = [...ranking.movies];
      let flatArray = [].concat(...req.body.movies);
      newMovies.push(flatArray);
      let newSenderId = [];
      newSenderId = ranking.senderId;
      newSenderId.push(req.body.senderId.toString());
      let newSenderUsername = [];
      newSenderUsername = ranking.senderUsername;
      newSenderUsername.push(req.body.senderUsername.toString());
      await Ranking.findOneAndUpdate(filter, {senderId: newSenderId, senderUsername: newSenderUsername, movies: newMovies})
    res.status(201).json(ranking);
    }else{
      const ranking = new Ranking ({
        senderId: req.body.senderId,
        senderUsername: req.body.senderUsername,
        movies: [...req.body.movies],
        collectionId: req.body.collectionId,
        collectionName: req.body.collectionName,
        receiver: req.body.receiver,
        seen: false,
      });
      const newRanking = await ranking.save()
      res.status(201).json(newRanking);
    }
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


router.delete('/Ranking/:id', async (req,res) => {
  try{
    await Ranking.findByIdAndDelete(req.params.id);
    res.status(200).json();
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

module.exports = router;
