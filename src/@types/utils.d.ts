interface StringToStringMap {
  [key: string]: string
}

type FormatClinicHistoryOutput = (
  clinicHistory: DtoCreateClinicHistoryI
) => Promise<DtoCreateClinicHistoryO>
