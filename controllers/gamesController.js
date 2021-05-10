const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// INDEX
router.get('/', async (req, res) => {
  const allGames = await db.Game.find();
  res.render('games/game-index', {
    games: allGames,
  });
});
//NEW
router.get('/new', (req, res) => {
  res.render('games/game-new');
});
//POST
router.post('/', async (req, res) => {
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
  // const userRatings = [];
  //userRatings.push(req.body.userRating);
  await db.Game.create({
    name: req.body.name,
    description: req.body.description,
    numPlayers: player,
    ageRating: req.body.ageRating,
    playTime: playTime,
    designer: designersArr,
    image: req.body.image,
    //userRatings: userRatings,
    genre: genreArr,
  });
  res.redirect('/games');
});
// SHOW
router.get('/:id', async (req, res) => {
  const selectedGame = await db.Game.findById({ _id: req.params.id })
    .populate({
      path: 'reviews',
        populate: {path: 'game'}
    });
  //const averageRating =
    //selectedGame.userRatings.reduce((acc, curr) => acc + curr) /
    //selectedGame.userRatings.length;
  res.render('games/game-show', {
    selected: selectedGame,
    //avgRating: averageRating.toFixed(2),
  });
});
// EDIT
router.get('/:id/edit', async (req,res) => {
  const selectedGame = await db.Game.findById({ _id: req.params.id });
  // const averageRating =
  //   selectedGame.userRatings.reduce((acc, curr) => acc + curr) /
  //   selectedGame.userRatings.length;
  res.render('games/game-edit', {
    selected: selectedGame,
    //avgRating: parseFloat(averageRating.toFixed(2)),
  });
})
// PUT
router.put('/:id', async (req,res) => {
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
  //const userRatings = [];
  //userRatings.push(req.body.userRating);
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
        //userRatings: userRatings,
        genre: genreArr,
      }
  });
  res.redirect(`/games/${req.params.id}`);
})
// DESTROY
router.delete('/:id', async (req,res)=>{
  await db.Game.findByIdAndDelete({_id: req.params.id})
  res.redirect('/games');
})

module.exports = router;
