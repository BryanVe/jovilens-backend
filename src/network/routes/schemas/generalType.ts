import Joi from 'joi'
import { idSchema } from '.'

export const createGeneralTypeSchema = Joi.object<DtoGeneralType>().keys({
  groupId: idSchema,
  label: Joi.string().required(),
})
