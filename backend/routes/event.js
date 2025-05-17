import mongoose from "mongoose";
import express from "express";
import Event from "../models/Event.js";
import router from "./user.js";

const router2 = express.Router()

// get all events 

router2.get('/events', async (req,res) => {
    try {
        const events = await Event.find()
        if (!events) return res.status(404).json({error: "Events not found"})
        res.json(events)
    } catch (err){
        res.status(400).json({error: err.message})
    }
})
// get event by id
router2.get('/events/:id', async (req,res) => {
    try {
        const event = await Event.findById(req.params.id)
        if (!event) return res.status(401).json({error: "Event not found"})
        res.json(event)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

// create event

router2.post('/events', async (req,res) => {
    try {
        let {title, description, date, location, organizer, category, attendees} = req.body;
        // Convert attendees to ObjectId array if present
        if (attendees && Array.isArray(attendees)) {
            attendees = attendees.map(id => new mongoose.Types.ObjectId(id));
        }
        // Optionally convert organizer and category as well
        if (organizer) organizer = new mongoose.Types.ObjectId(organizer);
        if (category) category = new mongoose.Types.ObjectId(category);

        const event = new Event({title, description, date, location, organizer, category, attendees});
        await event.save();
        res.status(201).json(event);
    } catch(err){
        res.status(400).json({error: err.message});
    }
})

// update event

router2.put('/events/:id', async (req,res) => {
    try {
     const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
     if (!event) return res.status(401).json({error: "Event Not Found"})
        res.json(event)
} catch(err){
    res.status(400).json({error: err.message})
}
})

router2.delete('/events/:id', async (req,res) => {
    try{
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) return res.status(401).json({error: "Event Not Found"})
        res.json({message: "Event Deleted Succesfully"})

        
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})


export default router2