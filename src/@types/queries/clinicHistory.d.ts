type GetClinicHistory = (id: string) => Promise<DtoGetClinicHistoryO>
type CreateClinicHistory = (
  data: DtoCreateClinicHistoryI
) => Promise<DtoCreateClinicHistoryO>
