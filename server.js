const PORT = 4000;
const express = require('express');
const app = express();
const gamesController = require('./controllers/gamesController');
// const userController = require('controllers/userController') //STRETCH
// const designerController = require('controllers/designerController'); //STRETCH
const db = require('./models');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
////////////////////////////////////////////

app.use('/games', gamesController);

/////////////Dummy Data
// const tempGames = require('./models/tempGames');
// db.Game.create(tempGames,(err,allGames) => {
//     if (err) return console.log(err);
//     console.log(allGames);
// });


////////////////////////////////////////////
app.get('/', (req,res) => {
    res.render('home.ejs');
});
////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server Active: Port ${PORT}`);
});