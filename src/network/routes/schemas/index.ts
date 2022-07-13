import Joi from 'joi'

const idSchema = Joi.string().length(24).required()

export { idSchema }
export * from './patient'
export * from './generalType'
