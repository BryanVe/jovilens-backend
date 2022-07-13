import httpErrors from 'http-errors'

import { createGeneralType, getGeneralType } from 'database'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'getOne' | 'create'
}

type GeneralTypeServiceRequest = Partial<DtoGeneralType>
type GeneralTypeServiceResponse = IGeneralType

export class GeneralTypeService {
  private _args: GeneralTypeServiceRequest

  constructor(args: GeneralTypeServiceRequest) {
    this._args = args
  }

  public process({ type }: Process): Promise<GeneralTypeServiceResponse> {
    switch (type) {
      case 'getOne':
        return this._getOne()
      case 'create':
        return this._create()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _getOne(): Promise<IGeneralType> {
    try {
      const { id } = this._args as DtoGeneralType
      const result = await getGeneralType(id)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _create(): Promise<IGeneralType> {
    try {
      const result = await createGeneralType(this._args as DtoGeneralType)

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}
