import express from 'express'
import { 
    getAllGroup, 
    createGroup,
    joinGroup
 } from '../controller/Group'
const router = express.Router()



router.post("/getAllGroup", getAllGroup)
router.post("/createGroup", createGroup)
router.put("/joinGroup", joinGroup)
export default router 