import express from "express";
import mongoose from "mongoose";

const app = express()
app.use(express.json())

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
