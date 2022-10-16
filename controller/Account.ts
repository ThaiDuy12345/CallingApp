import Account from '../model/Account'
import Group from '../model/Group'
import mongoose from 'mongoose'
export const getAllAccount = async(req:any, res:any) => {
    Account.find({
        _id: { $ne : req.body._id }
    }, (err:any, results:any) => {
        res.json(results)
    })
}
export const getEveryAccount = async(req:any, res:any) => {
    Account.find((err:any, results:any) => {
        res.json(results)
    })
}

export const createAnAccount = async(req:any, res:any) => {
    const newAccount = new Account({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.username,
        password: req.body.password,
        email: req.body.email,
        group: []
    })
    Account.create(newAccount, (err, account) => {
        res.json(newAccount)
    })
}
export const getAccount = async(req:any, res:any) => {
    Account.findOne({
        email: req.body.email,
        password: req.body.password
    }, (err:any, account:any) => {
        res.json(account)
    })
}
export const getAccountWithId = async(req:any, res:any) => {
    Account.findOne({
        _id: req.params.Id
    }, (err:any, account:any) => {
        res.json(account)
    })
}