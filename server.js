const PORT = 4000;
const express = require('express');
const app = express();
const gamesController = require('./controllers/gamesController');
const usersController = require('./controllers/usersController');
const reviewsController = require('./controllers/reviewsController');
// const designerController = require('./controllers/designerController'); //STRETCH
const db = require('./models');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

/////////////////CSS
const path=require('path');
app.use(express.static(path.join(__dirname,'public')));
////////////////////////////////////////////

app.use('/games', gamesController);
app.use('/users', usersController);
app.use('/reviews',reviewsController);




// ///////////Dummy Data
// const tempGames = require('./models/tempGames');
// db.Game.create(tempGames,(err,allGames) => {
//     if (err) return console.log(err);
//     console.log(allGames);
// });

////////////////////////////////////////////ROUTES
// Home
app.get('/', (req,res) => {
    res.render('home.ejs');
});
////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server Active: http://localhost:${PORT}`);
});
