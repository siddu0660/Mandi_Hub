const admin = require("firebase-admin");
require("dotenv").config();
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
});

const db = admin.database();
module.exports = db;