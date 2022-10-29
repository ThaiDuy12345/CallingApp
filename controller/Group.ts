import express from 'express'
import mongoose from 'mongoose'
import Group from '../model/Group'
import Account from '../model/Account'
export const getAllGroup = async(req:any, res:any) => {
    const account = await Account.findOne({
        _id:req.body.from_id
    })
    if(account != null){
        Group.find({
            _id: { 
                $in: account.group
            }
        }, (err:any, results:any) => {
            if(!err){
                res.json(results)
            }else{
                console.log(err)
            }
        })
    }
}
export const createGroup = async(req:any, res:any) => {
    //Tạo nhóm mới
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.groupName
    })
    Group.create(group)
    //Tìm kiếm account và thêm group mới tạo vào account
    const account = await Account.findOne({
        _id: req.body._id
    })
    if(account === null){
        res.json(null)
    }else{
        let groupObject = {
            _id: group._id
        }
        let groupArray = [...account.group, groupObject]
        Account.findOneAndUpdate({
            _id: account._id
        },{
            group: groupArray
        })
        for(var i = 0; i < groupArray.length;i++){
            console.log("new array: "+ groupArray[i]._id +" will be added to account: "+account.name)
        }
        //Thực hiện mời các thành viên vào group mới tạo
        for(var i = 0; i < req.body.groupAccounts.length; i++){
            Account.findOne({
                email: req.body.groupAccounts[i]
            }, (err:any, result:any) => {
                if(!err){
                    let groupInvite = [...result.group, groupObject]
                    Account.findOneAndUpdate({
                        _id: result._id
                    },{
                        group: groupInvite
                    })
                }
            })
        }
        res.json(group)
    }
}