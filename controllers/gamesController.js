const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
function requireLogin(req, res, next) {
  if (!req.session.currentUser) {
    res.redirect(`/users/login?destination=${req.originalUrl}`);
  } else {
    next();
  }
}
// reference for fuzzy search: https://www.youtube.com/watch?v=9_lKMTXVk64
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$!#\s]/g, '\\$&');
};
router.get('/', async (req, res, next) => {
  try {
    let allGames=[];
    if (req.query.search) {
      const regex= new RegExp(escapeRegex(req.query.search), 'gi');
      allGames = await db.Game.find({name: regex});
    } else {
      allGames = await db.Game.find();
    };
    res.render('games/game-index', {
      games: allGames,
      accessUrl: req.accessUrl,
      accessText: req.accessText,
    });
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
});
router.get('/new', requireLogin, (req, res) => {
  res.render('games/game-new', {
    accessUrl: req.accessUrl,
    accessText: req.accessText,
  });
});
router.post('/', async (req, res, next) => {
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
    if (!req.body.description) {
      delete req.body.description;
    }
    if (!req.body.image) {
      delete req.body.image;
    }
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
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const selectedGame = await db.Game.findById({
      _id: req.params.id,
      }).populate({
        path: 'reviews',
        populate: { path: 'game' },
    });
    let ratingSum = 0;
    selectedGame.reviews.forEach((element) => {
      ratingSum += element.rating;
    });
    const averageRating = ratingSum / selectedGame.reviews.length;
    res.render('games/game-show', {
      selected: selectedGame,
      avgRating: averageRating.toFixed(2),
      accessUrl: req.accessUrl,
      accessText: req.accessText,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
});
router.get('/:id/edit', requireLogin, async (req, res, next) => {
  try {
    if (req.session.isAdmin === true) {
      const selectedGame = await db.Game.findById({ _id: req.params.id });
      res.render('games/game-edit', {
        selected: selectedGame,
        accessUrl: req.accessUrl,
        accessText: req.accessText,
      });
    } else {
      const error = new Error();
      error.statusCode = 401;
      next(error);
    }
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
});
router.put('/:id', async (req, res, next) => {
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
      { _id: req.params.id },
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
        },
      }
    );
    res.redirect(`/games/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id', requireLogin, async (req, res, next) => {
  try {
    if (req.session.isAdmin === true) {
      await db.Game.findByIdAndDelete({ _id: req.params.id });
      const reviews = await db.Review.find({ game: req.params.id });
      reviews.forEach(async (element) => {
        const currentUser = await db.User.findById({ _id: element.user });
        currentUser.reviews.remove(req.params.id);
        await currentUser.save();
        await element.delete();
      });
      res.redirect('/games');
    } else {
      const error = new Error();
      error.statusCode = 401;
      next(error);
    }
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
});
module.exports = router;