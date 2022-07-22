type GetPatient = (id: string) => Promise<DtoGetPatient>
type CreatePatient = (data: DtoCreatePatient) => Promise<DtoPatient>
type GetPatients = (
  data: DtoGetPatientsRequest
) => Promise<DtoGetPatientsResponse>
