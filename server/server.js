import './config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';

//initialize Express
const app = express();

// Connect to database
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send('API is running...'));

//Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})