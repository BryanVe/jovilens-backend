interface ResponseProps {
  error: boolean
  message: unknown
  res: CustomResponse
  status: number
}

export const response = ({
  error,
  message,
  res,
  status,
}: ResponseProps): void => {
  res.status(status).send({ error, message })
}
