const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.model.js");

router.param('id', function(req,res,next, id){
   const modified = id;
   req.id = modified;
   next();
})
router.get('/Movies', async (req, res) => {
  try{
    const movies = await Movie.find();
    res.send({data: movies});
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.get('/Movies/:id', async (req, res) => {
  try{
    const movie = await Movie.findOne({_id: req.params.id});
    res.send(movie);
  }catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post('/Movies', async (req,res) => {
  const movie = new Movie ({
    titleEn: req.body.titleEn,
    titleBg: req.body.titleBg,
    image: req.body.image,
    year: req.body.year,
  })
  try{
    const newMovie = await movie.save()
    res.status(201).json(newMovie);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})


module.exports = router;
