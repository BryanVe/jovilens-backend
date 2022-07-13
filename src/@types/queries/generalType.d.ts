type GetGeneralType = (id: string) => Promise<IGeneralType>
type CreateGeneralType = (
  generalTypeData: DtoGeneralType
) => Promise<IGeneralType>
