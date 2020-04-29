require('dotenv').config() // import and configure dotenv
var express = require('express'); // import express library
var gameController = require('./controllers/gamecontroller'); // import game controller
var userController = require('./controllers/usercontroller');

const db = require('./db');
db.sync();

var app = express(); // create new express server
app.use(require('./middleware/headers'));
app.use(express.json()); // tell the server to read our data
// as json

app.use(express.static(__dirname + '/public')); // showing express what directory
// to host

// load in headers middleware

// giving express to host at
app.get('/', (req, res) => res.render('index'));

// localhost:xxxx/games

app.use('/games', gameController); // set up express to use the /games router w/ gameController
app.use('/user', userController);

app.listen(process.env.PORT, () => {
  console.log(`Spinning on ${process.env.PORT}`);
});
