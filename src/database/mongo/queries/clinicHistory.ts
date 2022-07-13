import { ClinicHistoryModel } from '..'
import httpErrors from 'http-errors'

export const getClinicHistory: GetClinicHistory = async (id) => {
  const clinicHistory = await ClinicHistoryModel.findById(id)

  if (!clinicHistory || clinicHistory.deleted)
    throw httpErrors(404, 'Clinic history not found')

  return clinicHistory
}

export const createClinicHistory: CreateClinicHistory = async (data) => {
  const clinicHistory = new ClinicHistoryModel(data)
  await clinicHistory.save()

  return clinicHistory
}
