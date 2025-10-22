const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) return res.redirect('/auth/sign-in');
    res.render('foods/index.ejs', { foods: user.pantry, user });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// NEW
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect('/users/foods');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// EDIT
router.get('/:foodId/edit', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    res.render('foods/edit.ejs', { user, food });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});
// SHOW — Display one food item from your own pantry
router.get('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    res.render('foods/show.ejs', { user, food });
  } catch (err) {
    console.error(err);
    res.redirect('/users/foods');
  }
});
// UPDATE
router.put('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.foodId);
    food.set(req.body);
    await user.save();
    res.redirect('/users/foods');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// DELETE
router.delete('/:foodId', async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.foodId).deleteOne();
    await user.save();
    res.redirect('/users/foods');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;