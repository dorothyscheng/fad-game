const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// INDEX
router.get('/', async (req, res, next) => {
  try {
    const allGames = await db.Game.find();
    res.render('games/game-index', {
      games: allGames,
    });
  } catch (error) {
    error.statusCode=500;
    next(error);
  }
});
//NEW
router.get('/new', (req, res) => {
  res.render('games/game-new');
});
//POST
router.post('/', async (req, res,next) => {
  try {
    const player = {
      min: req.body.minPlayers,
      max: req.body.maxPlayers,
    };
    const playTime = {
      min: req.body.minPlayTime,
      max: req.body.maxPlayTime,
    };
    const designersArr = req.body.designer.split(', ');
    const genreArr = req.body.genre.split(', ');
    await db.Game.create({
      name: req.body.name,
      description: req.body.description,
      numPlayers: player,
      ageRating: req.body.ageRating,
      playTime: playTime,
      designer: designersArr,
      image: req.body.image,
      genre: genreArr,
    });
    res.redirect('/games');
  } catch(error) {
    error.statusCode=400;
    next(error);
  }
});
// SHOW
router.get('/:id', async (req, res,next) => {
  try {
    const selectedGame = await db.Game.findById({ _id: req.params.id })
      .populate({
        path: 'reviews',
          populate: {path: 'game'}
      });
    let ratingSum=0;
    selectedGame.reviews.forEach(element=>{
      ratingSum+=element.rating;
    });
    const averageRating=ratingSum/selectedGame.reviews.length;
    res.render('games/game-show', {
      selected: selectedGame,
      avgRating: averageRating.toFixed(2),
    });
  } catch(error) {
    error.statusCode=404;
    next(error);
  }
});
// EDIT
router.get('/:id/edit', async (req,res, next) => {
  try {
    const selectedGame = await db.Game.findById({ _id: req.params.id });
    res.render('games/game-edit', {
      selected: selectedGame,
    });
  } catch (error) {
    error.statusCode=404;
    next(error);
  };
})
// PUT
router.put('/:id', async (req,res, next) => {
  try {
    const player = {
      min: req.body.minPlayers,
      max: req.body.maxPlayers,
    };
    const playTime = {
      min: req.body.minPlayTime,
      max: req.body.maxPlayTime,
    };
    const designersArr = req.body.designer.split(', ');
    const genreArr = req.body.genre.split(', ');
    await db.Game.findByIdAndUpdate(
      {_id: req.params.id},
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          numPlayers: player,
          ageRating: req.body.ageRating,
          playTime: playTime,
          designer: designersArr,
          image: req.body.image,
          genre: genreArr,
        }
    });
    res.redirect(`/games/${req.params.id}`);
  } catch (error) {
    next(error);
  };
})
// DESTROY
router.delete('/:id', async (req,res)=>{
  try {
    await db.Game.findByIdAndDelete({_id: req.params.id})
    res.redirect('/games');
  } catch (error) {
    next(error);
  };
})

module.exports = router;
