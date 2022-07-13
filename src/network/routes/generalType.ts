import { Router, NextFunction, Response } from 'express'
import httpErrors from 'http-errors'
import { ValidationError } from 'joi'

import { response } from 'network/response'
import { GeneralTypeService } from 'services'
import { createGeneralTypeSchema, idSchema } from './schemas'

export const GeneralType = Router()

GeneralType.route('/generalType').post(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body } = req
      await createGeneralTypeSchema.validateAsync(body)

      const gts = new GeneralTypeService(body as DtoGeneralType)
      const result = await gts.process({ type: 'createGeneralType' })

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
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      await idSchema.validateAsync(id)

      const gts = new GeneralTypeService(id)
      const result = await gts.process({ type: 'getGeneralType' })

      response({ error: false, message: result, res, status: 200 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)
