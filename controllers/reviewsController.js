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
    game.reviews.push(newReview._id);
    await game.save();
    await user.save();
    res.redirect(`/users/${user._id}`);
});
// Edit
router.get('/:id/edit', async (req,res) => {
    const selected = await db.Review.findById({_id: req.params.id})
        .populate('game')
        .populate('user');
    res.render('reviews/review-edit',{
        selected: selected,
    });
});
// Update
router.put('/:id', async (req,res) =>{
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
})
// Delete
router.delete('/:id', async (req,res)=>{
    const review = await db.Review.findByIdAndDelete({_id: req.params.id});
    const user = await db.User.findOne({reviews: req.params.id});
    const game = await db.Game.findOne({reviews: req.params.id});
    user.reviews.remove(req.params.id);
    await user.save();
    game.reviews.remove(req.params.id);
    await game.save();
    res.redirect(`/users/${user._id}`);
});

module.exports=router;