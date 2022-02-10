type GetPatient = (id: string) => Promise<IPatient>
type CreatePatient = (patientData: DtoPatient) => Promise<IPatient>
