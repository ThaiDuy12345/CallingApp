import Account from '../model/Account'
import Group from '../model/Group'
import mongoose from 'mongoose'
export const getAllAccount = async(req:any, res:any) => {
    Account.find({}, (err:any, results:any) => {
        res.json(results)
    })
}

export const createAnAccount = async(req:any, res:any) => {
    const newGroup = new Group({
        _id:  new mongoose.Types.ObjectId(),
        name: 'Group 2d 3d'
    })
    const newAccount = new Account({
        _id: new mongoose.Types.ObjectId(),
        name: 'Nguyễn Ngọc Thái Duy',
        password: '123456',
        group: [
            {_id: newGroup._id}
        ]
    })
    Group.create(newGroup, (err, group) => {
        if(err) console.log("Lỗi")
    })
    Account.create(newAccount, (err, account) => {
        res.json(newAccount)
    })
}
export const getAccount = async(req:any, res:any) => {
    Account.findOne({
        name: req.body.name,
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