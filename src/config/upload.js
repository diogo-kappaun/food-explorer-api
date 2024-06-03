import crypto from 'crypto'
import multer from 'multer'
import path from 'path'
import { AppError } from '../utils/AppError.js'

const TMP_FOLDER = path.resolve('tmp')
const UPLOADS_FOLDER = path.resolve('tmp', 'uploads')

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (request, file, callback) => {
      const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif',
      ]

      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true)
      } else {
        callback(new AppError('Tipo de arquivo inválido!'))
      }
    },
  }),
}

export default {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
