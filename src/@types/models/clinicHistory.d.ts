interface ISymptom {
  id: ObjectId
  answer: string
}

interface IClinicHistory extends GeneralModel {
  patientId: ObjectId
  signs?: string[]
  symptoms?: Symptom[]
  diagnosis?: string
  treatment?: string
  nextConsultation?: Date
}
