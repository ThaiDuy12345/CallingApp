import express from 'express'
import { 
    getAllGroup, 
    createGroup 
 } from '../controller/Group'
const router = express.Router()



router.post("/getAllGroup", getAllGroup)
router.post("/createGroup", createGroup)
export default router 