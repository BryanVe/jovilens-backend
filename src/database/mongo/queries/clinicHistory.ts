import { ClinicHistoryModel, GeneralTypeModel } from '..'
import httpErrors from 'http-errors'

const formatClinicHistoryOutput: FormatClinicHistoryOutput = async (
  clinicHistory
) => {
  const outClinicHistory: DtoCreateClinicHistoryO = {
    ...clinicHistory,
    signs: undefined,
    symptoms: undefined,
  }

  if (clinicHistory.signs) {
    const signs = await GeneralTypeModel.find(
      {
        _id: clinicHistory.signs,
        deleted: false,
      },
      'label'
    )

    if (signs.length > 0)
      outClinicHistory.signs = signs.map((sign) => ({
        id: sign._id.toString(),
        label: sign.label,
      }))
  }

  if (clinicHistory.symptoms) {
    const answers = clinicHistory.symptoms.reduce<StringToStringMap>(
      (result, symptom) => {
        if (!result[symptom.id]) result[symptom.id] = symptom.answer

        return result
      },
      {}
    )

    const symptoms = await GeneralTypeModel.find(
      {
        _id: clinicHistory.symptoms.map((symptom) => symptom.id),
        deleted: false,
      },
      'label'
    )

    if (symptoms.length > 0)
      outClinicHistory.symptoms = symptoms.map((symptom) => ({
        id: symptom._id.toString(),
        label: symptom.label,
        answer: answers[symptom._id.toString()],
      }))
  }

  return outClinicHistory
}

export const getClinicHistory: GetClinicHistory = async (id) => {
  const _clinicHistory = await ClinicHistoryModel.findById(id)

  if (!_clinicHistory || _clinicHistory.deleted)
    throw httpErrors(404, 'Clinic history not found')

  const clinicHistory = await formatClinicHistoryOutput(_clinicHistory.toJSON())
  return clinicHistory
}

export const createClinicHistory: CreateClinicHistory = async (data) => {
  const _clinicHistory = new ClinicHistoryModel(data)
  await _clinicHistory.save()

  const clinicHistory = await formatClinicHistoryOutput(_clinicHistory.toJSON())
  return clinicHistory
}
