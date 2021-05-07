const PORT = 4000;
const express = require('express');
const app = express();
// const gamesController = require('/controllers/gamesController');
// const userController = require('controllers/userController') //STRETCH
// const designerController = require('controllers/designerController'); //STRETCH
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
////////////////////////////////////////////

// app.use('/games', gameController);

////////////////////////////////////////////
app.get('/', (req,res) => {
    res.render('home.ejs');
});
////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server Active: Port ${PORT}`);
});