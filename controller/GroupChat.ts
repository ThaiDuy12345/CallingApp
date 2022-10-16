import express from 'express'
import mongoose from 'mongoose'
import GroupChat from '../model/GroupChat'

export const addAChat = async (req:any, res:any) => {
    const newChat = new GroupChat({
        _id : new mongoose.Types.ObjectId(),
        chatDate: new Date(),
        content: req.body.content,
        from_id: req.body.from_id,
        to_id: req.body.to_id
    })
    GroupChat.create(newChat, (err, result) => {
        res.json(newChat)
    })
}

export const getChat = async (req:any, res:any) => {
    const result1 = await GroupChat.find({
        to_id: req.body.user2_id
    }).populate('from_id')
    result1.sort((a:any, b:any) => {
        return a.chatDate > b.chatDate? 1:-1
    })
    res.json(result1)
}
export const getChatGroupDataAndReturn = async(data:any) => {
    console.log(`${data.from_id} nhắn với group ${data.to_id} là ${data.content}`)
    const result = await GroupChat.create({
        _id: new mongoose.Types.ObjectId(),
        chatDate: data.chatDate,
        content: data.content,
        from_id: data.from_id,
        to_id: data.to_id
    })
    return await GroupChat.findOne({
        _id: result._id
    }).populate('from_id')
}