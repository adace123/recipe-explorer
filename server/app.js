const express = require('express');
const bodyParser = require('body-parser');
const recipes = require('./routes/recipes');
const passport = require('passport');
const cors = require('cors');
const local = require('./routes/auth/local');
const social = require('./routes/auth/social');
const app = express();

// require('./db/seeds')();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

app.use('/api/recipes', recipes);
app.use('/auth', local);
app.use('/auth/social', social);
app.set('view engine', 'ejs');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('error...');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

app.listen(process.env.PORT || 3001, () => {
  console.log('listening');
});

module.exports = app;
