import { Router, NextFunction } from 'express'
import httpErrors from 'http-errors'
import { ValidationError } from 'joi'

import { response } from 'network/response'
import { PatientService } from 'services'
import { createPatientSchema } from './schemas'

const Patient = Router()

Patient.route('/patient').post(
  async (
    req: CustomRequest,
    res: CustomResponse,
    next: NextFunction
  ): Promise<void> => {
    const {
      body: { args },
    } = req

    try {
      await createPatientSchema.validateAsync(args)
      const ps = new PatientService(args as DtoPatient)
      const result = await ps.process({ type: 'create' })

      response({ error: false, message: result, res, status: 201 })
    } catch (e) {
      if (e instanceof ValidationError)
        return next(new httpErrors.UnprocessableEntity(e.message))

      next(e)
    }
  }
)

export { Patient }
