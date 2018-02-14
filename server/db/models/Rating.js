const sequelize = require('../db');
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const User = require('./User');
const Recipe = require('./Recipe');

const Rating = sequelize.define('rating', {
    rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    userid: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    recipeid: {
        type: Sequelize.TEXT,
        primaryKey: true
    }
});

Rating.removeAttribute('id');

module.exports = Rating;
