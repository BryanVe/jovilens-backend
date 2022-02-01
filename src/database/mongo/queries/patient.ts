import { PatientModel } from '..'

export const createPatient: CreatePatient = async (patientData) => {
  const patient = new PatientModel(patientData)
  await patient.save()

  return patient.toJSON()
}
