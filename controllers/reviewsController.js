const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// New
router.get('/new', (req,res)=> {
    res.render('reviews/review-new');
});
// Post
router.post('/',async (req,res)=>{
    const user= await db.User.findOne({username: req.body.username});
    const game= await db.Game.findOne({name: req.body.gameName});
    const newReview = await db.Review.create({
        user: user._id,
        game: game._id,
        rating: req.body.rating,
        review: req.body.review,
    });
    user.reviews.push(newReview._id);
    await user.save();
    res.send(newReview);
});

module.exports=router;