import express from 'express'
import { addAChat, getChat } from '../controller/DMChat'
const router = express.Router()

router.post("/addAChat", addAChat)
router.post("/getChat", getChat)
export default router