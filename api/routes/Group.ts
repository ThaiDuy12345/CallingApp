import express from 'express'
import { getAllGroup } from '../controller/Group'
const router = express.Router()



router.use("/getAllGroup", getAllGroup)

export default router 