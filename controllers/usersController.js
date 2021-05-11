const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');

router.use(methodOverride('_method'));

/////////login
router.get('/login', (req, res) => {
  res.render('users/user-login');
});

router.post('/login', async (req, res) => {
  const user = await db.User.findOne({ username: req.body.username });
  if (!user) {
    return res.redirect('/users/new');
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    if (user.isAdmin) {
      req.session.isAdmin = true;
    }
    req.session.currentUser = user.username;

    res.redirect(`/users/${user._id}`);
  } else {
    res.redirect('/users/login');
  }
});
//////login redirect
function requireLogin(req,res,next) {
  if (!req.session.currentUser) {
      res.redirect('/users/login');
  } else {
      next();
  };
};

/////////log out
router.get('/logout', async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
});

// Index
router.get('/', async (req, res, error) => {
  try {
    const allUsers = await db.User.find();
    res.render('users/user-index', {
      users: allUsers,
    });
  } catch (error) {
    next(error);
  }
});
// New
router.get('/new', (req, res) => {
  res.render('users/user-new');
});
// Post
router.post('/', async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    if (!req.body.profilePic) {
      delete req.body.profilePic;
    }
    await db.User.create({
      username: req.body.username,
      password: hashPassword,
    });
    res.redirect('/users');
  } catch (error) {
    error.statusCode = 400;
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
    error.statusCode = 404;
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
    error.statusCode = 404;
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
  }
});
// Destroy
router.delete('/:id', requireLogin, async (req, res, next) => {
  try {
    const user = await db.User.findById({_id: req.params.id});
    if (
      req.session.isAdmin === true || 
      req.session.currentUser === user.username 
    ){
      await db.User.findByIdAndDelete({ _id: req.params.id });
      await db.Review.deleteMany({ user: req.params.id });
      res.redirect('/users');
    }; 
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
});

module.exports = router;
