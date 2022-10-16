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