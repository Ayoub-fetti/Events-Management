import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import express, { Router } from "express";
import User from "../models/User.js";

const router = express.Router();

// register
router.post('/register', async (req, res) => {
    const { username, email, password} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({username, email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: 'Uuser registred succesfully'})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// login 

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try  {
        const user = await User.findOne({email})
        if (!user) return res.status(401).json({error: 'User not found'})
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({error: "Incorrect Paswword"})
        const token = jwt.sign({userId: user._id, role: user.role}, 'SECRET_KEY', {expiresIn: '1h'})
        res.json({token})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})
export default router;