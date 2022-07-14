import Joi from 'joi'
import { idSchema } from '.'

export const symptomSchema = Joi.object<DtoClinicHistorySymptom>().keys({
  id: idSchema.required(),
  answer: Joi.string().required(),
})

export const createClinicHistorySchema =
  Joi.object<DtoCreateClinicHistoryI>().keys({
    patientId: idSchema.required(),
    signs: Joi.array().items(idSchema.required()),
    symptoms: Joi.array().items(symptomSchema.required()),
    diagnosis: Joi.string(),
    treatment: Joi.string(),
    nextConsultation: Joi.string(),
  })
