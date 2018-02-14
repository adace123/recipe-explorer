const sequelize = require('../db');
const Sequelize = require('sequelize');
const User = require('./User');
const Rating = require('./Rating');

const Recipe = sequelize.define('recipe', {
  recipeid: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.TEXT
  },
  title: {
       type: Sequelize.TEXT,
       allowNull: false,
       default: "Title not provided"
  },
  time: {
       type: Sequelize.STRING,
       allowNull: false,
       default: "Time not provided"
  },
  instructions: {
       type: Sequelize.ARRAY(Sequelize.TEXT),
       allowNull: false
  },
  ingredients: {
       type: Sequelize.ARRAY(Sequelize.TEXT),
       allowNull: false
  },
  imageURL: {
       type: Sequelize.TEXT,
       allowNull: false,
       validate: {
           isURL: true
       },
       default: "Image URL not provided"
  }
});

User.hasMany(Recipe, {
  foreignKey: 'userid'
});

Recipe.hasMany(Rating, {
    foreignKey: 'recipeid'
});

module.exports = Recipe;