import express from 'express'
import { getAnImage } from '../controller/Image'
const router = express.Router()

router.get('/:Id', getAnImage)

export default router