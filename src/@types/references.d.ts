type ObjectId = import('mongoose').ObjectId

interface GeneralModel {
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}
