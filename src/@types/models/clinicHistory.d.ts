interface ISymptom {
  id: ObjectId
  answer: string
}

interface IClinicHistory {
  patientId: ObjectId
  signs?: string[]
  symptoms?: Symptom[]
  diagnosis?: string
  treatment?: string
  nextConsultation?: Date
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}
