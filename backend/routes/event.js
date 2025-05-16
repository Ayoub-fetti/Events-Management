import express from "express";
import Event from "../models/Event.js";
import router from "./user.js";

const router = express.Router()

// get all events 

router.get('/events', async (req,res) => {
    try {
        const events = await Event.find()
        if (!events) return res.status(404).json({error: "Events not found"})
        res.json(events)
    } catch (err){
        res.status(400).json({error: err.message})
    }
})
// get event by id
router.get('/events/:id', async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(401).json({error: "Event not found"})
        res.json(event)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

// create event

router.post('/events', async (req,res) => {
    try {
        const {title,description,date,location,organizer,category,attendees} = req.body
        const event = new Event({title,description,date,location,organizer,category,attendees})
        await User.save()
    } catch(err){
        res.status(400).json({error: err.message})
    }
})

// update event

router.put('/events/:id', async (req,res) => {
    try {
     const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
     if (!event) return res.status(401).json({error: "Event Not Found"})
        res.json(event)
} catch(err){
    res.status(400).json({error: err.message})
}
})

router.delete('/events/:id', async (req,res) => {
    try{
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) return res.status(401).json({error: "Event Not Found"})
        res.json({message: "Event Deleted Succesfully"})

        
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})


export default router