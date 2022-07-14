import { GeneralTypeModel } from '..'
import httpErrors from 'http-errors'

export const getGeneralType: GetGeneralType = async (id) => {
  const patient = await GeneralTypeModel.findById(id)

  if (!patient || patient.deleted)
    throw httpErrors(404, 'General type not found')

  return patient
}

export const createGeneralType: CreateGeneralType = async (data) => {
  const patient = new GeneralTypeModel(data)
  await patient.save()

  return patient
}
