import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel'

export const loginUser = async (req,res) => {
    try {
        const {username , password} = req.body;
        const user = await userModel.findOne({username});
        if(!username) return res.status(400).json({Message:'Invalid Credentials'});
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({Message:"Invalid credentials"});
    } catch (error) {
        console.log(error)
    }
}