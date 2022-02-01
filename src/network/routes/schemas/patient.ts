import Joi from 'joi'

const createPatientSchema = Joi.object().keys({
  names: Joi.string().required(),
  lastNames: Joi.string().required(),
  phone: Joi.string().required(),
  age: Joi.number().required(),
  address: Joi.string().required(),
  occupation: Joi.string().required(),
  gender: Joi.string().required(),
  civilStatus: Joi.string(),
})

export { createPatientSchema }
