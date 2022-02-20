const {
  successResponse,
  errorResponse,
  errorValidation
} = require('../../helper/response')
const { hashPassword, compareHashWithPassword } = require('../../helper/bcrypt')
const { generateAccessTokenAdmin } = require('../../helper/jwt')
const adminRepository = require('./repository')
const AdminDto = require('./dto')

/**
 * @param {Request} req - express request
 * @param {Response} res - express response
 */

class AdminService {
  async getOne (req, res) {
    const id = req.params.id
    try {
      const data = await adminRepository
        .getOneById(id)
      if (!data) {
        res.status(400)
        return res.send(errorResponse(404, 'admin tidak ditemukan'))
      }
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
      role,
      password
    } = req.body
    try {
      const data = await adminRepository
        .getOneById(id)
      if (!data) {
        res.status(400)
        return res.send(errorResponse(404, 'admin tidak ditemukan'))
      }
      const dto = AdminDto
      dto.name = name || data.name
      dto.email = email || data.email
      dto.role = role || data.role
      dto.password = password || data.password
      dto.updated_at = new Date()
      await adminRepository.updateByID(id, dto)
      return res.send(successResponse('admin berhasil di update'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async delete (req, res) {
    const id = req.params.id
    try {
      const selected = await adminRepository
        .getOneById(id)
      if (!selected) {
        res.status(400)
        return res.send(errorResponse(404, 'admin tidak ditemukan'))
      }
      const data = await adminRepository
        .softDelete(id, new Date())
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getAll (req, res) {
    try {
      const data = await adminRepository.find()
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async create (req, res) {
    const {
      name,
      email,
      role,
      password
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
      const dto = AdminDto
      dto.name = name
      dto.email = email
      dto.role = role
      dto.created_at = new Date()
      const hassPass = await hashPassword(password)
      dto.password = hassPass
      await adminRepository
        .create(dto)
      return res.send(successResponse('admin berhasil di buat'))
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
      const data = await adminRepository
        .findOneByEmail(email)
        console.log(data)
      if(!data){
        res.status(400)
        return res.send(errorResponse(404, 'admin tidak ditemukan'))
      }
      const token = await compareHashWithPassword(password, data.password)
      if (!token) {
        res.status(400)
        return res.send(errorValidation('password salah'))
      } else {
        const signToken = generateAccessTokenAdmin(data.id)
        return res.send(successResponse(signToken))
      }
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }
}

module.exports = new AdminService()
