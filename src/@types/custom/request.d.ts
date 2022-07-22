type ExpressRequest = import('express').Request

interface CustomRequest extends ExpressRequest {
  body?:
    | DtoCreatePatient
    | DtoGeneralType
    | DtoClinicHistory
    | DtoGetPatientsRequest
  // We can add custom headers via intersection, remember that for some reason
  // headers must be in Snake-Pascal-Case
  headers: import('http').IncomingHttpHeaders & {}
}
