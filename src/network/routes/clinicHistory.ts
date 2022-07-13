import { Router, NextFunction, Response } from 'express'
import httpErrors from 'http-errors'
import { ValidationError } from 'joi'

import { response } from 'network/response'
import { ClinicHistoryService } from 'services'
import { createClinicHistorySchema, idSchema } from './schemas'

export const ClinicHistory = Router()

ClinicHistory.route('/clinicHistory').post(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body } = req
      await createClinicHistorySchema.validateAsync(body)

      const chs = new ClinicHistoryService(body as DtoClinicHistory)
      const result = await chs.process({ type: 'createClinicHistory' })

      response({ error: false, message: result, res, status: 201 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)

ClinicHistory.route('/clinicHistory/:id').get(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      await idSchema.validateAsync(id)

      const chs = new ClinicHistoryService(id)
      const result = await chs.process({ type: 'getClinicHistory' })

      response({ error: false, message: result, res, status: 200 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)
