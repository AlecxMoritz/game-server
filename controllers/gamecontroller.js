var express = require('express'); // import express
var router = express.Router();
const sequelize = require('../db');
const Game = sequelize.import('../models/game');
const validateSession = require('../middleware/validate-session');

// /games/ - route or endpoint
router.get('/', (req, res) => res.send('Animal Crossing is sick'));

// Get All
router.get('/all', validateSession, (req, res) => {
  Game.findAll()
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json(err));
});

// Create a Game
router.post('/', validateSession, (req, res) => {
  if (!req.errors) {
    const gameFromRequest = {
      releaseDate: req.body.releaseDate,
      name: req.body.name,
      standaloneTitle: req.body.standaloneTitle,
      esrbRating: req.body.esrbRating,
      personalRating: req.body.personalRating,
      userId: req.user.id,
    };

    Game.create(gameFromRequest)
      .then(newGame => res.status(200).json(newGame))
      .catch(err => res.json(err));
  } else {
    res.status(500).json(req.errors);
  };
});

// Get Game by Name
router.get('/:searchName', (req, res) => {
  // console.log("Req.param:", req.param); Fancy .param() method

  Game.findOne({ where: { name: req.params.searchName }})
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json(err));
});

// Update by Id
router.put('/:id', validateSession, (req, res) => {
  if (!req.errors) {
    Game.update(req.body, {
      where: {
         id: req.params.id,
         userId: req.user.id,
        }
       })
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  } else {
    res.status(500).json(req.errors);
  }
});

// Delete by Id
router.delete('/:id', validateSession, (req, res) => {
  if (!req.errors) {
    Game.destroy({ where: { id: req.params.id }})
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  } else {
    res.status(500).json(req.errors);
  }
});


// 2nd route or end point
router.get('/questions', (req, res) => res.send('Stardew Valley is also sick'));

module.exports = router;
