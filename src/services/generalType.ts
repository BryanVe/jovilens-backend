import httpErrors from 'http-errors'

import { createGeneralType, getGeneralType } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getGeneralType' | 'createGeneralType'
}

type GeneralTypeServiceRequest = string | DtoGeneralType
type GeneralTypeServiceResponse = IGeneralType

export class GeneralTypeService {
  private _args: GeneralTypeServiceRequest

  constructor(args: GeneralTypeServiceRequest) {
    this._args = args
  }

  public process({ type }: Process): Promise<GeneralTypeServiceResponse> {
    switch (type) {
      case 'getGeneralType':
        return this._getGeneralType()
      case 'createGeneralType':
        return this._createGeneralType()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getGeneralType(): Promise<IGeneralType> {
    try {
      const result = await getGeneralType(this._args as string)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _createGeneralType(): Promise<IGeneralType> {
    try {
      const result = await createGeneralType(this._args as DtoGeneralType)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}
