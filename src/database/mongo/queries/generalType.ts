import { GeneralTypeModel } from '..'
import httpErrors from 'http-errors'

export const getGeneralType: GetGeneralType = async (id) => {
  const patient = await GeneralTypeModel.findById(id)

  if (!patient) throw httpErrors(404, 'Patient not found')

  return patient
}

export const createGeneralType: CreateGeneralType = async (patientData) => {
  const patient = new GeneralTypeModel(patientData)
  await patient.save()

  return patient.toJSON()
}
