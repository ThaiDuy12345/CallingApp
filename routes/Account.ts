import express from 'express'
import { 
    getAllAccount,
    createAnAccount,
    getAccount,
    getAccountWithId,
    getEveryAccount,
    forgotPassword
} from '../controller/Account'
const router = express.Router()

router.get("/", getEveryAccount)
router.post("/getAllAccount", getAllAccount)
router.post("/getAccount", getAccount)
router.get("/getAccountWithId/:Id", getAccountWithId)
router.post("/createAnAccount", createAnAccount)
router.post("/forgotPassword", forgotPassword)

export default router