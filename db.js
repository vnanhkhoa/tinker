const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');

const serviceAccount = require("./serviceAccountKey.json");

const firebase = initializeApp({
  credential: cert(serviceAccount)
});

module.exports = firebase;