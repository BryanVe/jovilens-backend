interface IPatient {
  names: string
  lastNames: string
  phone: string
  age: number
  address: string
  occupation: string
  gender: string
  civilStatus?: string
  deleted: boolean
  createdAt: Date
  updatedAt: Date
}
