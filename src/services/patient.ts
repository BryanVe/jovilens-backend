import httpErrors from 'http-errors'

import { createPatient } from 'database'
import { EFU, MFU, GE, errorHandling } from './utils'

type Process = {
  type: 'create'
}

class PatientService {
  private _args: DtoPatient | null

  constructor(args: DtoPatient | null = null) {
    this._args = args
  }

  public process({ type }: Process): Promise<string | IPatient[] | IPatient> {
    switch (type) {
      case 'create':
        return this._create()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
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
