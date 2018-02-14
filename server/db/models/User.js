const sequelize = require('../db');
const Sequelize = require('sequelize');
const Recipe = require('./Recipe');
const Rating = require('./Rating');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    userid: {
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: true
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
           isEmail: true
        }
    },
    username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    }
});


User.prototype.isAdmin = function() {
    return process.env.ADMIN_EMAIL === this.email;
}

User.prototype.getRecipes = function() {
    console.log(Recipe)
 //   return Recipe.find({where: {userid: this.userid}}).then(recipes => recipes);
}

User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

User.hasMany(Rating, {
    foreignKey: 'userid'
});

module.exports = User;