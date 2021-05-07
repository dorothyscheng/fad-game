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
