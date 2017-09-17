require('dotenv').config();
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoURL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:19014/${process.env.DB_DATABASENAME}`,
    mongooseDB = mongoose.connect(mongoURL);

module.exports = mongooseDB;