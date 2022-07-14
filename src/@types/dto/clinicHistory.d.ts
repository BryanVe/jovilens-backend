interface DtoClinicHistorySymptom {
  id: string
  answer: string
}

interface DtoClinicHistory {
  patientId: string
  signs?: string[]
  symptoms?: DtoClinicHistorySymptom[]
  diagnosis?: string
  treatment?: string
  nextConsultation?: Date
}

interface DtoClinicHistorySignO {
  id: string
  label: string
}

interface DtoClinicHistorySymptomO {
  id: string
  label: string
  answer: string
}

type DtoCreateClinicHistoryI = DtoClinicHistory

interface DtoCreateClinicHistoryO extends DtoClinicHistory {
  signs?: DtoClinicHistorySignO[]
  symptoms?: DtoClinicHistorySymptomO[]
}

interface DtoGetClinicHistoryO extends DtoClinicHistory {
  signs?: DtoClinicHistorySignO[]
  symptoms?: DtoClinicHistorySymptomO[]
}
