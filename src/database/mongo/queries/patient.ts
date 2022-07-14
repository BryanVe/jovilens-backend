import { PatientModel } from '..'
import httpErrors from 'http-errors'

export const getPatient: GetPatient = async (id) => {
  const patient = await PatientModel.findById(id)

  if (!patient || patient.deleted) throw httpErrors(404, 'Patient not found')

  return patient
}

export const createPatient: CreatePatient = async (data) => {
  const patient = new PatientModel(data)
  await patient.save()

  return patient
}
