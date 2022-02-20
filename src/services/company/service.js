const {
  successResponse,
  errorResponse,
  errorValidation
} = require('../../helper/response')
const { hashPassword, compareHashWithPassword } = require('../../helper/bcrypt')
const { generateAccessToken } = require('../../helper/jwt')
const companyRepository = require('./repository')
const CompanyDto = require('./dto')

/**
 * @param {Request} req - express request
 * @param {Response} res - express response
 */

class CompanyService {
  async create (req, res) {
    const {
      name,
      email,
      description,
      password,
      image
    } = req.body
    if (!name) {
      res.status(400)
      return res.send(errorValidation('name tidak boleh kosong'))
    }
    if (!email) {
      res.status(400)
      return res.send(errorValidation('email tidak boleh kosong'))
    }
    try {
      const defaultPasssword = 'ytcdefaultpass'
      const dto = CompanyDto
      dto.name = name
      dto.email = email
      dto.description = description
      dto.image = image
      dto.created_at = new Date()
      const hassPass = await hashPassword(password || defaultPasssword)
      dto.password = hassPass
      await companyRepository
        .create(dto)
      return res.send(successResponse('company berhasil di buat'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async login (req, res) {
    const { email, password } = req.body
    if (!email) {
      res.status(400)
      return res.send(errorValidation('email tidak boleh kosong'))
    }
    if (!password) {
      res.status(400)
      return res.send(errorValidation('password tidak boleh kosong'))
    }
    try {
      const data = await companyRepository
        .findOneByEmail(email)
      const token = await compareHashWithPassword(password, data.password)
      if (!token) {
        res.status(400)
        return res.send(errorValidation('password salah'))
      } else {
        const signToken = generateAccessToken(data.id)
        return res.send(successResponse(signToken))
      }
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getOne (req, res) {
    const id = req.params.id
    try {
      const data = await companyRepository
        .getOneById(id)
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async update (req, res) {
    const id = req.params.id
    const {
      name,
      email,
      description,
      image
    } = req.body
    try {
      const data = await companyRepository
        .getOneById(id)
      if (!data) {
        res.status(400)
        return res.send(errorResponse(404, 'company tidak ditemukan'))
      }
      const dto = CompanyDto
      dto.name = name || data.name
      dto.email = email || data.email
      dto.description = description || data.description
      dto.image = image || data.image
      await companyRepository.updateByID(id, dto)
      return res.send(successResponse('company berhasil di update'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async delete (req, res) {
    const id = req.params.id
    try {
      const selected = await companyRepository
        .getOneById(id)
      if (!selected) {
        res.status(400)
        return res.send(errorResponse(404, 'company tidak ditemukan'))
      }
      const data = await companyRepository
        .deleteById(id, new Date())
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getAll (req, res) {
    try {
      const data = await companyRepository.find()
      return res.send(successResponse(data, 'success'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }
}

module.exports = new CompanyService()
