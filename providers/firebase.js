const firebase = require('firebase');

firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "zappy-node.firebaseapp.com",
  databaseURL: "https://zappy-node.firebaseio.com",
  projectId: "zappy-node",
  storageBucket: "",
  messagingSenderId: "538562288062",
  appId: "1:538562288062:web:5372e0f947cd2c3b"
});

module.exports = firebase.database();
