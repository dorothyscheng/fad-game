const express = require('express');
const router = express.Router();
const db = require('../models/index');
const methodOverride = require('method-override');

// Index
router.get('/', async (req,res)=>{
    const allGames= await db.Game.find();
    res.render('games/game-index',{
        games: allGames,
    });
});

module.exports = router;