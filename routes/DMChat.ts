import express from 'express'
import multer from 'multer'
import { addAChat, getChat, loadImage } from '../controller/DMChat'
const upload = multer()
const router = express.Router()

router.post("/addAChat", addAChat)
router.post("/loadImage",upload.single("file"), loadImage)
router.post("/getChat", getChat)
export default router