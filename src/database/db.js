const mongoose = require('mongoose')
const { Env } = require('../config/env-loader')

function dbConn () {
  try {
    mongoose.connect(Env().MONGO_DB_URL)
    return mongoose.connection
  } catch (error) {
    return error
  }
}

module.exports = dbConn()
