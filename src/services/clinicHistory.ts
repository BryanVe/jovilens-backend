import httpErrors from 'http-errors'

import { createClinicHistory, getClinicHistory } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getClinicHistory' | 'createClinicHistory'
}

type ClinicHistoryServiceRequest = string | DtoCreateClinicHistoryI
type ClinicHistoryServiceResponse =
  | DtoCreateClinicHistoryO
  | DtoGetClinicHistoryO

export class ClinicHistoryService {
  private _args: ClinicHistoryServiceRequest

  constructor(args: ClinicHistoryServiceRequest) {
    this._args = args
  }

  public process({ type }: Process): Promise<ClinicHistoryServiceResponse> {
    switch (type) {
      case 'getClinicHistory':
        return this._getClinicHistory()
      case 'createClinicHistory':
        return this._createClinicHistory()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getClinicHistory(): Promise<DtoGetClinicHistoryO> {
    try {
      const result = await getClinicHistory(this._args as string)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _createClinicHistory(): Promise<DtoCreateClinicHistoryO> {
    try {
      const result = await createClinicHistory(this._args as DtoClinicHistory)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}
