const jwt = require('jsonwebtoken')
const { Env } = require('../config/env-loader')

function generateAccessToken (id) {
  return jwt.sign({ id: id }, Env().JWT_SECRET_KEY, { expiresIn: '1d' })
}

function generateAccessTokenAdmin (id) {
  return jwt.sign({ id: id }, Env().JWT_ADMIN_SECRET_KEY, { expiresIn: '1d' })
}

module.exports = {
  generateAccessToken,
  generateAccessTokenAdmin
}
