import { Router, NextFunction, Response } from 'express'
import httpErrors from 'http-errors'
import { ValidationError } from 'joi'

import { response } from 'network/response'
import { PatientService } from 'services'
import { createPatientSchema, idSchema } from './schemas'

export const Patient = Router()

Patient.route('/patient').post(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body } = req
      await createPatientSchema.validateAsync(body)

      const ps = new PatientService(body as DtoCreatePatient)
      const result = await ps.process({ type: 'createPatient' })

      response({ error: false, message: result, res, status: 201 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)

Patient.route('/patient/:id').get(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params
      await idSchema.validateAsync(id)

      const ps = new PatientService(id)
      const result = await ps.process({ type: 'getPatient' })

      response({ error: false, message: result, res, status: 200 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)
