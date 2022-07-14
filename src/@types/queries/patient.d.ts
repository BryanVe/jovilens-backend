type GetPatient = (id: string) => Promise<DtoGetPatient>
type CreatePatient = (data: DtoCreatePatient) => Promise<DtoCreatePatient>
