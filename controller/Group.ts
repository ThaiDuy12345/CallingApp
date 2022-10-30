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
        await Account.findOneAndUpdate({
            _id: account._id
        },{
            group: groupArray
        })
        //Thực hiện mời các thành viên vào group mới tạo
        for(var i = 0; i < req.body.groupAccounts.length; i++){
            Account.findOne({
                email: req.body.groupAccounts[i]
            }, async (err:any, result:any) => {
                if(!err){
                    let groupInvite = [...result.group, groupObject]
                    await Account.findOneAndUpdate({
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
export const joinGroup = async (req:any, res:any) => {
    let account = await Account.findOne({
        _id: req.body._id
    })
    if(account !== null){
        let newGroupArray = [...account.group, {
            _id: req.body.group_id
        }]
        await Account.findOneAndUpdate({
            _id: account._id
        },{
            group: newGroupArray
        })
        Group.findOne({
            _id: req.body.group_id
        }, (err:any, group:any) => {
            if(!err){
                res.json(group)
            }
        })
        
    }else res.json(null)
}
export const leaveGroup = async (req:any, res:any) => {
    let account = await Account.findOne({
        _id: req.body._id
    })
    if(account !== null){
        let newGroupArray = account.group
        for(var i = 0; i < newGroupArray.length; i++){
            console.log(newGroupArray[i]._id)
            if(newGroupArray[i]._id === req.body.group_id){
                newGroupArray.splice(newGroupArray.indexOf(newGroupArray[i]), 1)
                console.log("This is the group will be deleted from this account "+req.body.group_id)
                break
            }
        }
        await Account.findOneAndUpdate({
            _id: account._id
        }, {
            group: newGroupArray
        })
        Group.findOne({
            _id: req.body.group_id
        }, (err:any, group: any) => {
            if(!err) res.json(group)
            else res.json(null)
        })
    }else{
        res.json(null)
    }

}