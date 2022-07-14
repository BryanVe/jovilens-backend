import { Response, Request, Router } from 'express'

import { response } from 'network/response'

export const Home = Router()

Home.route('').get((req: Request, res: Response) => {
  response({
    error: false,
    message: 'Welcome to your Express Backend!',
    res,
    status: 200,
  })
})
