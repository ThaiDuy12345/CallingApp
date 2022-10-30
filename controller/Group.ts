import express from 'express'
import mongoose from 'mongoose'
import Group from '../model/Group'
import Account from '../model/Account'
import GroupChat from '../model/GroupChat'
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
    //Tìm kiếm tài khoản cần rời nhóm
    let account = await Account.findOne({
        _id: req.body._id
    })
    if(account !== null){
        //Tìm kiếm và truy xuất nhóm cần rời
        let newGroupArray = account.group
        for(var i = 0; i < newGroupArray.length; i++){
            if(req.body.group_id === newGroupArray[i]._id?.toString()){
                newGroupArray.splice(newGroupArray.indexOf(newGroupArray[i]), 1)
                break
            }
        }
        //Cập nhật lại tài khoản mới
        await Account.findOneAndUpdate({
            _id: account._id
        }, {
            group: newGroupArray
        })
        //Tìm kiếm nhóm vừa bị xoá khỏi tài khoản
        let group = await Group.findOne({
            _id: req.body.group_id
        })
        //Kiểm tra thử là có còn ai tồn đọng trong nhóm
        if(checkAnyAccountLeftInTheGroup(await Account.find({}), group?._id) === false){
            console.log("Không còn một ai trong nhóm")
            //Xoá hết tất cả đoạn chat đến group này
            await GroupChat.deleteMany({
                to_id: group?._id
            })
            //Xoá nhóm
            await Group.findOneAndDelete({
                _id: group?._id
            })
        }else{
            console.log("Vẫn còn có người trong group")
            //Chuyển đổi người dùng thành -> Thành viên đã bị xoá khỏi nhóm
            await GroupChat.updateMany({
                from_id: account._id,
                to_id: group?._id
            }, {
                content: "Không hiển thị nội dung vì người dùng đã rời khỏi nhóm"
            })
        }
        res.json(group)
    }else{
        res.json(null)
    }
}
const checkAnyAccountLeftInTheGroup = (allAccount:any, group_id:any) => {
    for(var i = 0; i < allAccount.length; i++){
        for(var k = 0;k < allAccount[i].group.length; k++){
            console.log(allAccount[i].group[k]._id+ " vs "+group_id)
            if(allAccount[i].group[k]._id.toString() === group_id.toString()) {
                return true
            }
        }
    }
    return false;
}