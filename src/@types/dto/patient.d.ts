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

interface DtoGetPatientsRequest {
  limit: number
  skip: number
  id?: string
  names?: string
  lastNames?: string
  phone?: string
  createdAt?: {
    startDate: Date
    endDate: Date
  }
}

interface DtoGetPatientsResponse {
  count: number
  rows: DtoPatient[]
}
