import { PatientModel } from '..'
import httpErrors from 'http-errors'

export const getPatient: GetPatient = async (id) => {
  const patient = await PatientModel.findById(id)

  if (!patient) throw httpErrors(404, 'Patient not found')

  return patient
}

export const createPatient: CreatePatient = async (patientData) => {
  const patient = new PatientModel(patientData)
  await patient.save()

  return patient.toJSON()
}
