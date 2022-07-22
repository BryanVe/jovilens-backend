import httpErrors from 'http-errors'

import { createPatient, getPatient, getPatients } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getPatient' | 'getPatients' | 'createPatient'
}

type PatientServiceRequest = string | DtoCreatePatient | DtoGetPatientsRequest
type PatientServiceResponse =
  | DtoCreatePatient
  | DtoGetPatient
  | DtoGetPatientsResponse

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
      case 'getPatients':
        return this._getPatients()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getPatient(): Promise<DtoGetPatient> {
    try {
      const result = await getPatient(this._args as string)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _createPatient(): Promise<DtoCreatePatient> {
    try {
      const result = await createPatient(this._args as DtoCreatePatient)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getPatients(): Promise<any> {
    try {
      const result = await getPatients(this._args as DtoGetPatientsRequest)

      return result
    } catch (error) {}
  }
}
