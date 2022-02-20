class AdminDto {
  constructor (name, role, email, password, createdAt, updatedAt, deletedAt) {
    this.name = name
    this.role = role
    this.email = email
    this.password = password
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.deleted_at = deletedAt
  }
}

module.exports = new AdminDto()
