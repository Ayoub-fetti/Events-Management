import express from "express";
import Category from "../models/Category.js";
import router from "./user.js";

const router = express.Router()

// get all categories

router.get('/categories', async (req,res) => {
    try {

        const categories = await Category.find()
        if (!categories) return res.status(404).json({error: "Categories not found"})
        res.json(categories)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})

// get categories by id 

router.get('/categories/:id', async (req,res) => {
    try {

        const category = await Category.findById(req.params.id)
        if (!category) return res.status(404).json({error: "Category not found"})
        res.json(category)
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})


// create category

router.post('/categories', async (req, res) => {
    try {
        const {name, description} = req.body 
        const category = new Category({name,description})
        await category.save()
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// update category

router.put('/categories/:id', async (req, res) => {
    try { 
        const category =  await Category.findByIdAndUpdate(req.params.id , req.body, {new:true})
        if (!category) return res.status(401).json({error: "Category not found"})
            res.json(category)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// delete category

router.delete('/categories/:id', async (req, res) => {
    try { 
        const category =  await Category.findBy(req.params.id)
        if (!category) return res.status(401).json({error: "Category not found"})
        res.json({message: "Category Deleted Succesfully"})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

export default  router
