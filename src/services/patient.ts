import httpErrors from 'http-errors'

import { createPatient, getPatient } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getOne' | 'create'
}

type PatientServiceRequest = Partial<DtoPatient> | null
type PatientServiceResponse = IPatient

class PatientService {
  private _args: PatientServiceRequest

  constructor(args: PatientServiceRequest = null) {
    this._args = args
  }

  public process({ type }: Process): Promise<PatientServiceResponse> {
    switch (type) {
      case 'getOne':
        return this._getOne()
      case 'create':
        return this._create()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getOne(): Promise<IPatient> {
    try {
      const { id } = this._args as DtoPatient
      const result = await getPatient(id)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _create(): Promise<IPatient> {
    try {
      const result = await createPatient(this._args as DtoPatient)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { PatientService }
