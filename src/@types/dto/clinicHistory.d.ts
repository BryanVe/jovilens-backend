interface DtoSymptom {
  id: string
  answer: string
}

interface DtoClinicHistory {
  patientId: string
  signs?: string[]
  symptoms?: DtoSymptom[]
  diagnosis?: string
  treatment?: string
  nextConsultation?: Date
}
