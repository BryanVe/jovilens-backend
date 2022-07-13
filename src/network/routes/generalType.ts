import { Router, NextFunction } from 'express'
import httpErrors from 'http-errors'
import { ValidationError } from 'joi'

import { response } from 'network/response'
import { GeneralTypeService } from 'services'
import { createGeneralTypeSchema, idSchema } from './schemas'

export const GeneralType = Router()

GeneralType.route('/generalType').post(
  async (
    req: CustomRequest,
    res: CustomResponse,
    next: NextFunction
  ): Promise<void> => {
    const {
      body: { args },
    } = req

    try {
      await createGeneralTypeSchema.validateAsync(args)
      const gts = new GeneralTypeService(args as DtoGeneralType)
      const result = await gts.process({ type: 'create' })

      response({ error: false, message: result, res, status: 201 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)

GeneralType.route('/generalType/:id').get(
  async (
    req: CustomRequest,
    res: CustomResponse,
    next: NextFunction
  ): Promise<void> => {
    const {
      params: { id },
    } = req

    try {
      await idSchema.validateAsync(id)
      const gts = new GeneralTypeService({ id })
      const result = await gts.process({ type: 'getOne' })

      response({ error: false, message: result, res, status: 200 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)
