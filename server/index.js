import dotenv from 'dotenv';

import express from 'express';
import { urlencoded } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import chatRoutes from './routes/Chat.js';
dotenv.config();
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("the server is running ......");
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

console.log('Loaded environment variables:', process.env);
console.log('MongoDB URI:', DATABASE_URL);

if (!DATABASE_URL) {
    console.error('CONNECTION_URL is not defined in the environment variables');
    process.exit(1);
}

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message));
