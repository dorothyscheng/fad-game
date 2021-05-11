const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// Index
router.get('/', async (req, res, error) => {
  try {
    const allUsers = await db.User.find();
    res.render('users/user-index', {
      users: allUsers,
    });
  } catch (error) {
    next(error)
  };
});
// New
router.get('/new', (req, res) => {
  res.render('users/user-new');
});
// Post
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.profilePic) {
      delete req.body.profilePic;
    };
    await db.User.create(req.body);
    res.redirect('/users');
  } catch (error) {
    error.statusCode=400;
    next(error);
  }
});
// Show
router.get('/:id', async (req, res, next) => {
  try {
    const selected = await db.User.findById({ _id: req.params.id }).populate({
      path: 'reviews',
      populate: { path: 'game' },
    });
    res.render('users/user-show', {
      selected: selected,
    });
  } catch (error) {
    error.statusCode=404;
    next(error);
  }
});
// Edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const selected = await db.User.findById({
      _id: req.params.id,
    });
    res.render('users/user-edit', {
      selected: selected,
    });
  } catch (error) {
    error.statusCode=404;
    next(error);
  }
});
// Update
router.put('/:id', async (req, res, next) => {
  try {
    await db.User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          age: req.body.age,
          profilePic: req.body.profilePic,
          preferredGenre: req.body.preferredGenre,
        },
      }
    );
    res.redirect(`/users/${req.params.id}`);
  } catch (error) {
    next(error);
  };
});
// Destroy
router.delete('/:id', async (req, res, next) => {
  try {
    await db.User.findByIdAndDelete({ _id: req.params.id });
    await db.Review.deleteMany({ user: req.params.id });
    res.redirect('/users');
  } catch (error) {
    next(error);
  };
});

module.exports = router;
