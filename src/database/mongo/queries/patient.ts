import { ClinicHistoryModel, PatientModel } from '..'
import httpErrors from 'http-errors'

export const getPatient: GetPatient = async (id) => {
  const patient = await PatientModel.findById(id)

  if (!patient || patient.deleted) throw httpErrors(404, 'Patient not found')

  const _clinicHistories = await ClinicHistoryModel.find(
    {
      patientId: patient._id,
      deleted: false,
    },
    'id createdAt',
    {
      sort: 'createdAt',
    }
  )

  const clinicHistories = _clinicHistories.map<DtoGetPatientClinicHistory>(
    (ch) => ({
      id: ch._id.toString(),
      createdAt: ch.createdAt,
    })
  )

  return {
    ...patient.toJSON(),
    clinicHistories,
  }
}

export const createPatient: CreatePatient = async (data) => {
  const patient = new PatientModel(data)
  await patient.save()

  return patient.toJSON()
}
