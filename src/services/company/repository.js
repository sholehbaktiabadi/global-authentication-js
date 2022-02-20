const companySchema = require('./schema')

class CompanyRepository {
  constructor (db) {
    this.db = db
  }

  async create (dto) {
    try {
      return this.db.create(dto)
    } catch (error) {
      return error
    }
  }

  async findOneByEmail (email) {
    try {
      return this.db.findOne({ email: email })
    } catch (error) {
      return error
    }
  }

  async getOneById (objectId) {
    try {
      return this.db.findById(objectId)
    } catch (error) {
      return error
    }
  }

  async updateByID (objectId, dto) {
    try {
      return this.db.findByIdAndUpdate(objectId, dto)
    } catch (error) {
      return error
    }
  }

  async deleteById (objectId, date) {
    try {
      return this.db.findByIdAndUpdate(objectId, { deleted_at: date })
    } catch (error) {
      return error
    }
  }

  async find () {
    try {
      return this.db.find()
    } catch (error) {
      return error
    }
  }
}
module.exports = new CompanyRepository(companySchema)
