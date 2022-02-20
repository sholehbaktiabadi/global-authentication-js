const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10)
}

const compareHashWithPassword = async (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword)
}

module.exports = {
  hashPassword,
  compareHashWithPassword
}
