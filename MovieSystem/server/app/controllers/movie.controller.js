const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.model.js");
const average = require("../helpers/helpers.js");

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

router.put('/Movies/:_id', async (req,res) => {
  try{
    const movie = await Movie.findById(req.params._id);
    let newUserRatings = [...movie.userRatings];
    const index = movie.userRatings.findIndex(obj => obj.userId === req.body.userId);
    if(index === -1){
        newUserRatings.push({userId: req.body.userId, rating: req.body.rating});
    }else{
        movie.userRatings.splice(index,1);
        newUserRatings = [...movie.userRatings];
        newUserRatings.push({userId: req.body.userId, rating: req.body.rating});
    }
  let allRatings = [];
  for(let i=0 ; i < newUserRatings.length; ++i){
    allRatings.push(parseInt(newUserRatings[i].rating));
  }
  const av = average(allRatings).toFixed(2);
  await Movie.findByIdAndUpdate(req.params._id, {userRatings: [...newUserRatings], averageRating: av });
  }catch(error){
    res.status(500).json({message: error.message});
  }
});


module.exports = router;
