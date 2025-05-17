import express from "express";
import Comment from "../models/Comment.js"

const router3 = express.Router()

// get all comments

router3.get('/comments', async (req,res) => {
try {
    const comments = await Comment.find()
    if (!comments) return res.status(401).json({error: "Comment nots found"})
        res.json(comments)

} catch (err) {
        res.status(500).json({error: err.message})
}
})

// add comment

router3.post('/comments', async (req,res) => {
    try {
        const {content,user,event} = req.body
        const comment = new Comment({content,user,event})
        await comment.save()
        res.status(201).json(comment)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// delete comment
router3.delete('/comments/:id', async (req,res) => {
    try {
        const comment = Comment.findByIdAndDelete(req.params.id)
        if (!comment) return res.status(401).json({error: "Comment not found"})
        res.json({message: "Comment Deleted Succesfully"})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router3
