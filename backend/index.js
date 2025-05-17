import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import eventRoutes from './routes/event.js'
import commentRoutes from './routes/comment.js'
import categoryRoutes from './routes/category.js'
import cors from "cors";


const app = express()
app.use(cors());
app.use(express.json())
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', eventRoutes)
app.use('/api', commentRoutes)
app.use('/api', categoryRoutes)


mongoose.connect('mongodb://localhost:27017/eventsdb', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err)
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
});



// middleware JWT

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' })
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY')
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token invalide' })
  }
}
