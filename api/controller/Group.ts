import express from 'express'
import mongoose from 'mongoose'
import Group from '../model/Group'

export const getAllGroup = async(req:any, res:any) => {
    Group.find({}, (err:any, results:any) => {
        res.json(results)
    })
}