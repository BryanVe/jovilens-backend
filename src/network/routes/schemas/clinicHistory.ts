import Joi from 'joi'
import { idSchema } from '.'

export const symptomSchema = Joi.object<DtoSymptom>().keys({
  id: idSchema.required(),
  answer: Joi.string().required(),
})

export const createClinicHistorySchema = Joi.object<DtoClinicHistory>().keys({
  patientId: idSchema.required(),
  signs: Joi.array().items(idSchema.required()),
  symptoms: Joi.array().items(symptomSchema.required()),
  diagnosis: Joi.string(),
  treatment: Joi.string(),
  nextConsultation: Joi.string(),
})
