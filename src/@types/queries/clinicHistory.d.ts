type GetClinicHistory = (id: string) => Promise<IClinicHistory>
type CreateClinicHistory = (data: DtoClinicHistory) => Promise<IClinicHistory>
