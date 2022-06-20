const express = require("express");
const router = express.Router();
const Collection = require("../models/collection.model.js");
const Movie = require("../models/movie.model.js");

router.param('username', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.param('_id', function(req,res,next, _id){
  const modified = _id;
  req._id = modified;
  next();
})
router.get('/Collections', async (req, res) => {
  try{
    const collections = await Collection.find();
    res.send({data: collections});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Collections/:username', async (req, res) => {
  try{
    const collections = await Collection.find({user: req.params.username});
    res.send(collections);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post('/Collections', async (req,res) => {
  const collection = new Collection ({
    user: req.body.user,
    movies: req.body.movies,
    name: req.body.name,
  })
  try{
    const newCollection = await collection.save()
    res.status(201).json(newCollection);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})
router.put('/Collections/:_id', async (req,res) => {
  try{
    const collectionMovies = await Collection.findById(req.params._id);
    const movie = new Movie ({
      titleEn: req.body.titleEn,
      titleBg: req.body.titleBg,
      image: req.body.image,
      year: req.body.year,
      id: req.body.id,
    })
    const index = await collectionMovies.movies.findIndex( obj => obj.titleEn === req.body.titleEn);
    if(index > -1){
      collectionMovies.movies.splice(index,1);
    }else{
      collectionMovies.movies.push(movie);
    }
    await Collection.findByIdAndUpdate(req.params._id, {movies: [...collectionMovies.movies] });
  }catch(error){
    res.status(500).json({message: error.message});
  }
});

router.patch('/Collections/:_id', async(req,res) => {
  try{
    const body = {
      user: req.body.user,
      movies: req.body.movies,
      name: req.body.name,
    };
    const reorderedCollection =  await Collection.findByIdAndUpdate(req.params._id, body);
    res.status(200).json(reorderedCollection);
  }catch(error){
    res.status(500).json({message: error.message});
  }
})

router.delete('/Collections/:_id', async (req,res) => {
  try{
    await Collection.findByIdAndDelete(req.params._id);
    res.status(200);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});


module.exports = router;
