const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

// Index
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
  //object with min and max players
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
    userRatings: [req.body.usersRating],
    genre: genreArr,
  });

  res.redirect('/games');
});

// Show
router.get('/:id', async (req, res) => {
  const selectedGame = await db.Game.findById({ _id: req.params.id });
  const averageRating =
    selectedGame.userRatings.reduce((acc, curr) => acc + curr) /
    selectedGame.userRatings.length;
  res.render('games/game-show', {
    selected: selectedGame,
    avgRating: averageRating.toFixed(2),
  });
});

module.exports = router;
