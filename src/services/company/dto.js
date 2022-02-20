class CompanyDto {
  constructor (name, description, image, email, password, createdAt, updatedAt, deletedAt) {
    this.name = name
    this.description = description
    this.image = image
    this.email = email
    this.password = password
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.deleted_at = deletedAt
  }
}

module.exports = new CompanyDto()
