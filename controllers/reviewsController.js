const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

//////login redirect
function requireLogin(req,res,next) {
    if (!req.session.currentUser) {
        res.redirect('/users/login');
    } else {
        next();
    };
  };

// New
router.get('/new', requireLogin, async (req,res)=> {
    const allGames= await db.Game.find();
    res.render('reviews/review-new', {
        username: req.session.currentUser,
        games: allGames,
        accessUrl: req.accessUrl,
        accessText: req.accessText,
    });
});
// Post
router.post('/', requireLogin, async (req,res,next)=>{
    try {
        const user= await db.User.findOne({username: req.session.currentUser});
        const game= await db.Game.findOne({name: req.body.gameName});
        const newReview = await db.Review.create({
            user: user._id,
            game: game._id,
            rating: req.body.rating,
            review: req.body.review,
        });
        user.reviews.push(newReview._id);
        game.reviews.push(newReview._id);
        await game.save();
        await user.save();
        res.redirect(`/users/${user._id}`);
    } catch (error) {
        error.statusCode=400;
        next(error);
    };
});
// Edit
router.get('/:id/edit', requireLogin, async (req,res, next) => {
    try {
        const selected = await db.Review.findById({_id: req.params.id})
            .populate('game')
            .populate('user');
        if (req.session.isAdmin === true || req.session.currentUser === selected.user.username ){
            res.render('reviews/review-edit',{
                selected: selected,
                accessUrl: req.accessUrl,
                accessText: req.accessText,
            });
        } else { 
            const error = new Error;
            error.statusCode = 401; 
            next(error);
        }
    } catch (error) {
        error.statusCode=404;
        next(error);
    };
});
// Update
router.put('/:id', requireLogin, async (req,res,next) =>{
    try {
        const user = await db.User.findOne({reviews: req.params.id});
        await db.Review.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    rating: req.body.rating,
                    review: req.body.review,
                }
        });
        res.redirect(`/users/${user._id}`);
    } catch (error) {
        next(error);
    };
});
// Delete
router.delete('/:id', requireLogin, async (req,res, next)=>{
    try {
        const review = await db.Review.findById({_id: req.params.id}).populate('user');
        if (req.session.isAdmin === true || req.session.currentUser === review.user.username ){
            const user = await db.User.findOne({reviews: req.params.id});
            const game = await db.Game.findOne({reviews: req.params.id});
            review.delete();
            user.reviews.remove(req.params.id);
            await user.save();
            game.reviews.remove(req.params.id);
            await game.save();
            res.redirect(`/users/${user._id}`);
        } else { 
            const error = new Error;
            error.statusCode = 401; 
            next(error);
        } 
    } catch (error) {
        next(error);
    };
});

module.exports=router;