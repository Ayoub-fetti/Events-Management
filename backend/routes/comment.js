import express from "express";
import Comment from "../models/Comment.js"

const router = express.Router()

// get all comments

router.get('/comments', async (req,res) => {
try {
    const comments = await Comment.find()
    if (!comments) return res.status(401).json({error: "Comment nots found"})
        res.json(comments)

} catch (err) {
        res.status(500).json({error: err.message})
}
})

// add comment

router.post('/comments', async (req,res) => {
    try {
        const {content,user,event} = req.body
        const comment = new Comment({content,user,event})
        await comment.save()

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// delete comment
router.delete('/comments/:id', async (req,res) => {
    try {
        const comment = Comment.findByIdAndDelete(req.params.id)
        if (!comment) return res.status(401).json({error: "Comment not found"})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router
