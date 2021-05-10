const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// New
router.get('/new', (req,res)=> {
    res.render('reviews/review-new');
});

module.exports=router;