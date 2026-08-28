import express from 'express';
import userModel from '../models/userModel.js';
import { Router } from 'express';
import { model, modelNames } from 'mongoose';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        const saveUser = await newUser.save()
        console.log(saveUser)
    } catch (error) {
        console.log(error)
    }
})

router.post('/get', async (req, res) => {
    try {
        const getUser = await userModel.find()
        console.log(getUser)
        res.send({ getUser })
    } catch (error) {
        console.log(error)
    }
})

export default router;