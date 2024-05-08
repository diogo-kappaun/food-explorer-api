import express from 'express'
import 'express-async-errors'

import { AppError } from './utils/AppError'

import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3333

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(PORT, () => console.log(`Server is running | Port: ${PORT}`))
