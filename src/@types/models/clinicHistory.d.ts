interface ISymptom {
  id: string
  answer: string
}

interface IClinicHistory extends GeneralModel {
  patientId: string
  signs?: string[]
  symptoms?: ISymptom[]
  diagnosis?: string
  treatment?: string
  nextConsultation?: Date
}
