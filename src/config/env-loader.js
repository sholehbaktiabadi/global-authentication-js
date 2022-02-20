const dotenv = require('dotenv')
dotenv.config()

const Env = () => ({
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  JWT_ADMIN_SECRET_KEY: process.env.JWT_ADMIN_SECRET_KEY,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
})

module.exports = {
  Env
}
