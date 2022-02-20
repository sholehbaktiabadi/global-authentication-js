const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Env } = require('./src/config/env-loader')
const authAdmin = require('./src/services/middleware/auth')
const dbConn = require('./src/database/db')
const cors = require('cors')
const adminRoutes = require('./src/services/admin/controller')
const authCompanyRoutes = require('./src/services/company/auth-controller')
const companyRoutes = require('./src/services/company/controller')
const authAdminRoutes = require('./src/services/admin/auth-controller')
const { SERVER_PORT } = Env()

// test database connection
function dbTestConnection () {
  return dbConn
}

dbTestConnection()
const routePrefix = '/v1/user'
const routePrefixAdmin = '/v1/user/admin'
app.use(bodyParser.json())
app.use(cors())
app.use(routePrefix + '/auth', authCompanyRoutes)
app.use(routePrefixAdmin + '/auth', authAdminRoutes)
app.use(routePrefixAdmin, authAdmin, adminRoutes)
app.use(routePrefix, authAdmin, companyRoutes)

// test app
app.get('/', (req, res) => {
  res.send({ message: 'its running' })
})

app.listen(SERVER_PORT, () => {
  console.log('Server running on port: ', SERVER_PORT)
})
