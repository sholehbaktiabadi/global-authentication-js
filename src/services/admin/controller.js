const express = require('express')
const adminRoutes = express()
const service = require('./service')

adminRoutes.get('/:id', async (req, res) => await service.getOne(req, res))
adminRoutes.get('', async (req, res) => await service.getAll(req, res))
adminRoutes.put('/:id', async (req, res) => await service.update(req, res))
adminRoutes.delete('/:id', async (req, res) => await service.delete(req, res))

module.exports = adminRoutes
