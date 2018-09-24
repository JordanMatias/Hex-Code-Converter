const express = require('express');
const Color = require('../models/Color');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// Route to get all favorite colors
router.get('/', isLoggedIn, (req, res, next) => {
  Color.find({ _owner: req.user.id })
    .then(colors => {
      res.json(colors);
    })
    .catch(err => next(err));
});

// Route to add a color
router.post('/', isLoggedIn, (req, res, next) => {
  let newColor = {
    hex: req.body.hex,
    name: req.body.name,
    rgb: req.body.rgb,
    meaning: req.body.meaning,
    family: req.body.family,
    analagous: req.body.analagous,
    tetrad: req.body.tetrad,
    splitcomplement: req.body.splitcomplement,
    monochromatic: req.body.monochromatic
  };
  Color.create(newColor)
    .then(color => {
      console.log('color is created', newColor);
      res.json({
        success: true,
        color
      });
    })
    .catch(err => {
      console.log('this is where the error is');
      next(err);
    });
});

//Route to get a single color
router.get('/:id', isLoggedIn, (req, res, next) => {
  const id = req.params.id;
  Color.findById(id)
    .then(color => {
      res.json(color);
    })
    .catch(err => next(err));
});

// Route to delete a color
router.delete('/:id', isLoggedIn, (req, res, next) => {
  const id = req.params.id;
  Color.findByIdAndRemove(id)
    .then(color => {
      //res.redirect('/colors');
      res.json({
        success: true,
        color
      });
    })
    .catch(err => {
      console.log(err, 'Color was NOT deleted.');
    });
});

module.exports = router;
