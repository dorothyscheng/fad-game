const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// Index
router.get('/', async (req, res) => {
  const allUsers = await db.User.find();
  res.render('users/user-index', {
    users: allUsers,
  });
});
// New
router.get('/new', (req, res) => {
  res.render('users/user-new');
});
// Post
router.post('/', async (req, res) => {
  await db.User.create(req.body);
  res.redirect('/users');
});
// Show
router.get('/:id', async (req, res) => {
  const selected = await db.User.findById({ _id: req.params.id }).populate({
    path: 'reviews',
    populate: { path: 'game' },
  });
  res.render('users/user-show', {
    selected: selected,
  });
});
// Edit
router.get('/:id/edit', async (req, res) => {
  const selected = await db.User.findById({
    _id: req.params.id,
  });
  res.render('users/user-edit', {
    selected: selected,
  });
});
// Update
router.put('/:id', async (req, res) => {
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
});
// Destroy
router.delete('/:id', async (req, res) => {
  await db.User.findByIdAndDelete({ _id: req.params.id });
  await db.Review.deleteMany({ user: req.params.id });
  res.redirect('/users');
});

module.exports = router;
