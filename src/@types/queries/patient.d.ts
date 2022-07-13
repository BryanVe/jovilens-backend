type GetPatient = (id: string) => Promise<IPatient>
type CreatePatient = (data: DtoPatient) => Promise<IPatient>
