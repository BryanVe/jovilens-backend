interface DtoPatient {
  names: string
  lastNames: string
  phone: string
  age: number
  address: string
  occupation?: string
  gender?: string
  civilStatus?: string
}

type DtoCreatePatient = DtoPatient

interface DtoGetPatientClinicHistory {
  id: string
  createdAt: Date
}

interface DtoGetPatient extends DtoPatient {
  clinicHistories: DtoGetPatientClinicHistory[]
}
