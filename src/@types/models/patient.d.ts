interface IPatient extends GeneralModel {
  names: string
  lastNames: string
  phone: string
  age: number
  address: string
  occupation?: string
  gender?: string
  civilStatus?: string
}
