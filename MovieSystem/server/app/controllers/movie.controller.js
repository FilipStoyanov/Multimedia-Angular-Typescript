const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.model.js");

router.get('/Movies', async (req, res) => {
  try{
    const movies = await Movie.find();
    res.send({data: movies});
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
