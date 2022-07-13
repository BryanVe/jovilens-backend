import Joi from 'joi'

export const createGeneralTypeSchema = Joi.object().keys({
  groupId: Joi.string().length(24),
  label: Joi.string().required(),
})
