const express = require('express')
const companyRoutes = express()
const service = require('./service')

companyRoutes.get('/:id', async (req, res) => await service.getOne(req, res))
companyRoutes.get('/', async (req, res) => await service.getAll(req, res))
companyRoutes.put('/:id', async (req, res) => await service.update(req, res))
companyRoutes.delete('/:id', async (req, res) => await service.delete(req, res))

module.exports = companyRoutes
