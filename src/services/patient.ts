import httpErrors from 'http-errors'

import { createPatient, getPatient } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getPatient' | 'createPatient'
}

type PatientServiceRequest = string | DtoPatient
type PatientServiceResponse = IPatient

export class PatientService {
  private _args: PatientServiceRequest

  constructor(args: PatientServiceRequest) {
    this._args = args
  }

  public process({ type }: Process): Promise<PatientServiceResponse> {
    switch (type) {
      case 'getPatient':
        return this._getPatient()
      case 'createPatient':
        return this._createPatient()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getPatient(): Promise<IPatient> {
    try {
      const result = await getPatient(this._args as string)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _createPatient(): Promise<IPatient> {
    try {
      const result = await createPatient(this._args as DtoPatient)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}
