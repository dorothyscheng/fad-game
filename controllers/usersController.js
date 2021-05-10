const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// Index
router.get('/',async (req,res)=>{
    const allUsers=await db.User.find();
    res.render('users/user-index',{
        users: allUsers,
    });
})
// New
router.get('/new',(req,res)=>{
    res.render('users/user-new');
});
// Post
router.post('/',async (req,res)=>{
    await db.User.create(req.body);
    res.redirect('/users');
});
// Show
router.get('/:id',async (req,res)=>{
    const selected = await db.User.findById({_id: req.params.id});
    selected.populate('reviews');
    // const reviews = selected.reviews;
    res.send(selected);
    // res.render('users/user-show',{
    //     selected: selected,
    //     reviews: reviews,
    // });
});

module.exports=router;