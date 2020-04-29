const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up
router.post('/signup', (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then(user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});

      res.status(200).json({
        user: user,
        message: 'User created',
        sessionToken: token,
      })
    })
    .catch(err => res.status(500).json(err));
});

// Sign In
router.post('/signin', (req, res) => {
  User.findOne({ where: { email: req.body.email }})
    .then(user => {
      if (user) {
        console.log(user);
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            res.status(200).json({
              user: user,
              message: 'Logged In',
              sessionToken: token,
            })
          } else {
            // if password mismatch
            res.status(401).json({ error: "Failed to authenticate" });
          }
        })
      } else {
        // if no user
        res.status(404).json({ error: "User not found." });
      };
    });
});









module.exports = router;
