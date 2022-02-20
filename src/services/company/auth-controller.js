const express = require('express')
const authCompanyRoutes = express()
const service = require('./service')

authCompanyRoutes.post('/register', async (req, res) => await service.create(req, res))
authCompanyRoutes.post('/login', async (req, res) => await service.login(req, res))

module.exports = authCompanyRoutes
