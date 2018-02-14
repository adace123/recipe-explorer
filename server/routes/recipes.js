const express = require('express');
const router = express.Router();
const Recipe = require('../db/models/Recipe');
const Rating = require('../db/models/Rating');
const uuid = require('uuid/v4');
const db = require('../db/db');
const { isLoggedIn, isAuthorized } = require('../middleware/authMiddleware');

router.get('/all', (req, res, next) => {
    return Recipe.findAll({order: [['createdAt', 'DESC']]})
    .then(recipes =>Rating.findAll({order: [['createdAt', 'DESC']]}).then(ratings => res.status(200).json({recipes, ratings})))
    .catch(e => {
      console.log(e);
      res.status(500).json({error: "Unable to retrieve recipes"});
    });
});

router.get('/:id', (req, res, next) => {
    return Recipe.find({where: {recipeid: req.params.id}})
    .then(recipe => res.status(200).json(recipe))
    .catch(err => res.status(500).json({err}));
});

router.delete('/:id', isAuthorized, (req, res, next) => {
  return Recipe.destroy({where: {recipeid: req.params.id}})
  .then(row => {
    if(row === 1) {
      return res.status(200).json({message: "Recipe successfully deleted"});
    }
  })
  .catch(err => res.status(500).json(err));
});

router.post('/new', isLoggedIn, (req, res, next) => {
  const { recipe } = req.body;
  // const rating = {
  //   ratingid: uuid(),
  //   userid: recipe.userid,
  //   recipeid: recipe.recipeid,
  //   rating: 0
  // };
    return Recipe.findCreateFind({where: recipe})
    .then(r => {
      return res.status(200).json({recipe: r});
        //Rating.create(rating).then(result => res.status(200).json({recipe: r}));
    });
  
});

router.get('/ratings/:recipeid/', (req, res, next) => {
  return db.query("SELECT AVG(rating) FROM ratings WHERE recipeid = $recipeid", {bind: {recipeid: req.params.recipeid}})
  .then(avg => res.status(200).json(avg))
  .catch(err => res.status(404).json({error: err}));
});

router.post('/ratings', isLoggedIn, (req, res, next) => {
  console.log(req.body)
  const searchParams = {recipeid: req.body.recipeid, userid: req.body.userid, rating: req.body.rating};
  return Rating.create(searchParams)
  .then(rating => {
    res.status(200).json({rating});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: "Error. Rating could not be added."});
  });
});

router.put('/ratings', isLoggedIn, (req, res, next) => {
  console.log('update ratings');
  // change to search by rating id
  const searchParams = {recipeid: req.body.recipeid, userid: req.body.userid};
  return Rating.find({where: searchParams})
  .then(rating => {
    if(rating) {
      return Rating.update({rating: req.body.rating}, {where: searchParams}).then(updatedRating => {
        res.status(200).json({updatedRating});
      }).catch(err => console.log("something went wrong " + err));
    } else {
      res.status(404).json({error: "Recipe not found"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({error: err});
  });
});

router.put('/:id', isAuthorized, (req, res, next) => {
  return db.query(`UPDATE recipes SET ${req.body.field} = $value WHERE recipeid = $recipeid`
    ,{bind: {value: req.body.value,recipeid: req.params.id}})
    .then(updatedRecipe => {
      Recipe.find({where: {recipeid: req.params.id}})
      .then(recipe => {
        res.status(200).send(recipe);
      });
    })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: "Could not update recipe"});
  });
});

module.exports = router;