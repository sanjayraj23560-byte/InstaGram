import mongoose from "mongoose";
import express from 'express'

const userSchema = mongoose.Schema({
    user: {
        type: String
    },
    password: {
        type: String
    },
})

const userModel = mongoose.model('User', userSchema)
export default userModel;