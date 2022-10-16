import express from 'express'
import { getAllGroup } from '../controller/Group'
const router = express.Router()



router.post("/getAllGroup", getAllGroup)

export default router 