import express from 'express'
import { 
    getAllAccount,
    createAnAccount,
    getAccount,
    getAccountWithId
} from '../controller/Account'
const router = express.Router()

router.post("/getAllAccount", getAllAccount)
router.post("/getAccount", getAccount)
router.get("/getAccountWithId/:Id", getAccountWithId)
router.post("/createAnAccount", createAnAccount)
router.put("/putAccount", (req, res) => {
    res.send("HelloWorld")
})
router.delete("/deleteAccount", (req, res) => {
    res.send("HelloWorld")
})


export default router