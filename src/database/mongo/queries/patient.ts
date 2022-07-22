import { ClinicHistoryModel, PatientModel } from '..'
import httpErrors from 'http-errors'
import { Types } from 'mongoose'
import dayjs from 'dayjs'

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

export const getPatients: GetPatients = async (data) => {
  const { limit, skip, id, names, lastNames, phone, createdAt } = data

  const filters = {
    ...(id && { _id: Types.ObjectId.isValid(id) ? id : undefined }),
    ...(names && {
      names: {
        $regex: names,
        $options: 'i',
      },
    }),
    ...(lastNames && {
      lastNames: {
        $regex: lastNames,
        $options: 'i',
      },
    }),
    ...(phone && {
      phone: {
        $regex: phone,
        $options: 'i',
      },
    }),
    ...(createdAt && {
      createdAt: {
        $gte: dayjs(createdAt.startDate).startOf('D'),
        $lte: dayjs(createdAt.endDate).endOf('D'),
      },
    }),
  }

  const count = await PatientModel.count(filters)
  const patients = await PatientModel.find(filters, undefined, {
    limit,
    skip,
    sort: {
      createdAt: -1,
    },
  })

  return {
    count,
    rows: patients.map((patient) => patient.toJSON()),
  }
}
