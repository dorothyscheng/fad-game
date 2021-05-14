const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
router.use(methodOverride('_method'));

function requireLogin(req,res,next) {;
  if (!req.session.currentUser) {
      req.session.destination=req.originalUrl;
      res.redirect('/users/login');
  } else {
      next();
  };
};

router.get('/login', (req, res) => {
  res.render('users/user-login',{
    accessUrl: req.accessUrl,
    accessText: req.accessText,
  });
});

router.post('/login', async (req, res) => {
  try {
    const user = await db.User.findOne( { username: req.body.username } );
    if (!user) {
      return res.redirect('/users/new');
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      if (user.isAdmin) {
        req.session.isAdmin = true;
      }
      req.session.currentUser = user.username;
      if (req.session.destination) {
        res.redirect(req.session.destination);
      } else {
        res.redirect(`/users/${user._id}`);
      };
    } else {
      res.redirect('/users/login');
    }
  } catch (error) {
    next(error);
  };
});

router.get('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.redirect('/');
  } catch (error) {
    next(error);
  };
});

router.get('/profile', async (req,res, next)=>{
  try {
    if (req.session.currentUser) {
      const user= await db.User.findOne( { username: req.session.currentUser } );
      res.redirect(`/users/${user._id}`);
    } else {
      res.redirect('/users/login');
    };
  } catch (error) {
    next(error);
  };
});

router.get('/', async (req, res, error) => {
  try {
    const allUsers = await db.User.find();
    res.render('users/user-index', {
      users: allUsers,
      accessUrl: req.accessUrl,
      accessText: req.accessText,
    });
  } catch (error) {
    next(error);
  };
});

router.get('/new', (req, res) => {
  res.render('users/user-new',{
    message: req.query.message,
    accessUrl: req.accessUrl,
    accessText: req.accessText,
  });
});

router.post('/', async (req, res, next) => {
  try {
    const existingUserCheck= await db.User.findOne( { username: req.body.username } );
    if (existingUserCheck) {
      message='That username is already taken. Try another.'
      return res.redirect(`/users/new?message=${message}`);
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      if (!req.body.profilePic) {
        delete req.body.profilePic;
      };
      await db.User.create({
        username: req.body.username,
        password: hashPassword,
        profilePic: req.body.profilePic,
        age: req.body.age,
        preferredGenre: req.body.preferredGenre,
      });
      res.redirect('/users');
    };
  } catch (error) {
    error.statusCode = 400;
    next(error);
  };
});

router.get('/:id', async (req, res, next) => {
  try {
    const selected = await db.User.findById( {  _id: req.params.id } ).populate({
      path: 'reviews',
      populate: { path: 'game' },
    });
    res.render('users/user-show', {
      selected: selected,
      accessUrl: req.accessUrl,
      accessText: req.accessText,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  };
});

router.get('/:id/edit', requireLogin, async (req, res, next) => {
  try {
    const selected = await db.User.findById({
      _id: req.params.id,
    });
    if (req.session.isAdmin === true || req.session.currentUser === selected.username ){
      res.render('users/user-edit', {
        selected: selected,
        accessUrl: req.accessUrl,
        accessText: req.accessText,
      });
    } else { 
      const error = new Error;
      error.statusCode = 401; 
      next(error);
    };
  } catch (error) {
    error.statusCode = 404;
    next(error);
  };
});

router.put('/:id', async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await db.User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          password: hashPassword,
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

router.delete('/:id', requireLogin, async (req, res, next) => {
  try {
    const user = await db.User.findById( { _id: req.params.id } );
    if (req.session.isAdmin === true || req.session.currentUser === user.username) {
      await db.User.findByIdAndDelete( { _id: req.params.id } );
      await db.Review.deleteMany( { user: req.params.id } );
      res.redirect('/users');
    } else { 
      const error = new Error;
      error.statusCode = 401; 
      next(error);
    };
  } catch (error) {
    error.statusCode = 404;
    next(error);
  };
});

module.exports = router;