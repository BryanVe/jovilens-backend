import Joi from 'joi'
import { idSchema } from '.'

export const createPatientSchema = Joi.object<DtoCreatePatient>().keys({
  names: Joi.string().required(),
  lastNames: Joi.string().required(),
  phone: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  occupation: Joi.string(),
  gender: Joi.string(),
  civilStatus: Joi.string(),
})

export const getPatientsSchema = Joi.object<DtoGetPatientsRequest>().keys({
  limit: Joi.number().positive().required(),
  skip: Joi.number().required(),
  id: Joi.string().allow(''),
  names: Joi.string().allow(''),
  lastNames: Joi.string().allow(''),
  phone: Joi.string().allow(''),
  createdAt: Joi.object().keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
})
