const express = require('express')
const authAdminRoutes = express()
const service = require('./service')

authAdminRoutes.post('/register', async (req, res) => await service.create(req, res))
authAdminRoutes.post('/login', async (req, res) => await service.login(req, res))

module.exports = authAdminRoutes
