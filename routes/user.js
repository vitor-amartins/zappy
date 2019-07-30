const bcrypt = require('bcrypt');
const express = require('express');

const app = express();

const db = require('./../providers/firebase');
const handleError = require('./../providers/handle-error');

const User = db.ref(`${process.env.FIREBASE_ACCESS_TOKEN}/users`);

// ==================== REGISTER ==================== //

app.post('/register', async (req, res) => {
  try {
    if (
      !req.body.username
      || !req.body.password
      || !req.body.password2
      || !req.body.alias
    ) {
      handleError(res, null, 'missing-data');
      return;
    }
    if (req.body.password !== req.body.password2) {
      handleError(res, null, 'passwords-dont-match');
      return;
    }
    const checkUser = (await User
      .orderByChild('username')
      .equalTo(req.body.username)
      .once('value')).val();

    if (checkUser) {
      handleError(res, null, 'username-already-exists');
      return;
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    User.push({
      username: req.body.username,
      password: hash,
      alias: req.body.alias,
    });

    res.send('ok');
  } catch (err) {
    handleError(res, err, null);
  }
});

// ==================== LOGIN ==================== //

app.post('/login', (req, res) => {
  res.send('usuario');
});

module.exports = app;
