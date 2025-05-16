import User from "../models/User.js";
import express from "express";

const router = express.Router()

// get all users

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        if (!users) return res.status(404).json({error: "Users not found"})
        res.json(users)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// get user by ID 

router.all.get("/:id", async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({error: "User not found"})
        res.json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// create user 

router.post('/', async (req, res) => {
    try {
        const {username,email, password, role} = req.body 
        const user = new User({username,email,password,role})
        await user.save()
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// update user 

router.put('/:id', async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!user) return res.status(401).json({error: "User not found"})
        res.json(user)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

// delete user 

router.delete('/:id', async (req,res) => {
    try {
        const user = User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(401).json({error: "User not found"})
        res.json({ message: "User Delete succesfully"})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})


export default router