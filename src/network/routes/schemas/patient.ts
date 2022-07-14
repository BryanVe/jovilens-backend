import Joi from 'joi'

export const createPatientSchema = Joi.object<DtoPatient>().keys({
  names: Joi.string().required(),
  lastNames: Joi.string().required(),
  phone: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  occupation: Joi.string(),
  gender: Joi.string(),
  civilStatus: Joi.string(),
})
