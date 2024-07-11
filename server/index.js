import express from 'express';
import { urlencoded } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import chatRoutes from './routes/Chat.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a stack overflow clone API");
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;

console.log("Database URL:", DATABASE_URL); // Debugging line

if (!DATABASE_URL) {
    console.error("CONNECTION_URL is not set. Check your .env file.");
    process.exit(1); // Exit the application with an error code
}

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => console.log(`${err} did not connect`));

mongoose.set('strictQuery', true); // To suppress the deprecation warning
